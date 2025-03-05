/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { IAuth, IJwtPayload } from "./auth.interface";
import User from "../User/user.model";
import bcrypt from 'bcrypt';
import AppError from "../../app/errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../../app/config";
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload, Secret } from "jsonwebtoken";

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    if (!user.isActive) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is not active!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id as string,
      name: user.name as string,
      email: user.email as string,
      provider: user.provider,
      isActive: user.isActive,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    const updateUserInfo = await User.findByIdAndUpdate(
      user._id,
      { clientInfo: payload.clientInfo, lastLogin: Date.now() },
      { new: true, session },
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


const refreshToken = async (token: string) => {

  let verifiedToken = null;
  try {
     verifiedToken = verifyToken(
        token,
        config.jwt_refresh_secret as Secret
     );
  } catch (err) {
     throw new AppError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
     throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  if (!isUserExist.isActive) {
     throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
  }


  const jwtPayload: IJwtPayload = {
     userId: isUserExist._id as string,
     name: isUserExist.name as string,
     email: isUserExist.email as string,
     provider: isUserExist.provider,
     isActive: isUserExist.isActive,
     role: isUserExist.role,
  };

  const newAccessToken = createToken(
     jwtPayload,
     config.jwt_access_secret as Secret,
     config.jwt_access_expires_in as string
  );

  return {
     accessToken: newAccessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { userId } = userData;
  const { oldPassword, newPassword } = payload;

  const user = await User.findOne({ _id: userId });
  if (!user) {
     throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (!user.isActive) {
     throw new AppError(StatusCodes.FORBIDDEN, 'User account is inactive');
  }


  const isOldPasswordCorrect = await User.isPasswordMatched(
     oldPassword,
     user.password
  );
  if (!isOldPasswordCorrect) {
     throw new AppError(StatusCodes.FORBIDDEN, 'Incorrect old password');
  }

  const hashedPassword = await bcrypt.hash(
     newPassword,
     Number(config.bcrypt_salt_rounds)
  );
  await User.updateOne({ _id: userId }, { password: hashedPassword });

  return { message: 'Password changed successfully' };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
