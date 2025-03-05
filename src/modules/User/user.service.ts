/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { IUser, UserRole } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../app/errors/AppError";
import User from "./user.model";
import { AuthService } from "../Auth/auth.service";
import Customer from "../Customer/customer.model";
import { UserSearchableFields } from "./user.constant";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { IJwtPayload } from "../Auth/auth.interface";
import { ICustomer } from "../Customer/customer.interface";



const registerUser = async (userData: IUser) => {
   const session = await mongoose.startSession();

   try {
      session.startTransaction();

      if ([UserRole.ADMIN].includes(userData.role)) {
         throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Invalid role. Only User is allowed.');
      }

      const existingUser = await User.findOne({ email: userData.email }).session(session);
      if (existingUser) {
         throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Email is already registered');
      }

      const user = new User(userData);
      const createdUser = await user.save({ session });

      const profile = new Customer({
         user: createdUser._id,
      });

      await profile.save({ session });

      await session.commitTransaction();

      return await AuthService.loginUser({ email: createdUser.email, password: userData.password, clientInfo: userData.clientInfo });
   } catch (error) {
      if (session.inTransaction()) {
         await session.abortTransaction();
      }
      throw error;
   } finally {
      session.endSession();
   }
};



const getAllUser = async (query: Record<string, unknown>) => {
   const UserQuery = new QueryBuilder(User.find(), query)
      .search(UserSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

   const result = await UserQuery.modelQuery;
   const meta = await UserQuery.countTotal();
   return {
      result,
      meta,
   };
};

const myProfile = async (authUser: IJwtPayload) => {
   const isUserExists = await User.findById(authUser.userId);
   if (!isUserExists) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
   }
   if (!isUserExists.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is not active!");
   }

   const profile = await Customer.findOne({ user: isUserExists._id });


   return {
      ...isUserExists.toObject(),
      profile: profile || null
   }

}

const updateProfile = async (
   payload: Partial<ICustomer>,
   authUser: IJwtPayload
) => {
   const isUserExists = await User.findById(authUser.userId);

   if (!isUserExists) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
   }
   if (!isUserExists.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is not active!");
   }

   
   const result = await Customer.findOneAndUpdate(
      { user: authUser.userId },
      payload,
      {
         new: true,
      }
   ).populate('user');

   return result;
};

const updateUserStatus = async (userId: string) => {
   const user = await User.findById(userId);
   if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
   }

   user.isActive = !user.isActive;
   const updatedUser = await user.save();
   return updatedUser;
};

export const UserServices = {
   registerUser,
   getAllUser,
   myProfile,
   updateUserStatus,
   updateProfile,
};
