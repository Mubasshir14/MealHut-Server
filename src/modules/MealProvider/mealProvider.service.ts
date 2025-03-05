/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IMealProvider } from './mealProvider.interface';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { MealProvider } from './mealProvider.model';
import { IJwtPayload } from '../Auth/auth.interface';
import User from '../User/user.model';
import { UserRole } from '../User/user.interface';

const createMealProvider = async (
  mealProviderdata: Partial<IMealProvider>,
  logo: any,
  authUser: IJwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findById(authUser.userId).session(session);

    if (!existingUser) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User is not exists!');
    }

    if (!existingUser.isActive) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User is not active!');
    }

    if (logo) {
      mealProviderdata.logo = logo.path;
    }

    const mealProvider = new MealProvider({
      ...mealProviderdata,
      user: existingUser._id,
    });

    const createdMealProvider = await mealProvider.save({ session });

    await User.findByIdAndUpdate(
      existingUser._id,
      { provider: true, role: UserRole.MEALPROVIDER },
      { new: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return createdMealProvider;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMealProvider = async (authUser: IJwtPayload) => {
  const existingUser = await User.checkUserExist(authUser.userId);
  if (!existingUser.provider) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not meal provider!');
  }

  const mealProvider = await MealProvider.findOne({
    user: existingUser._id,
  });
  return mealProvider;
};

const getAllMealProvider = async () => {
  const mealProvider = await MealProvider.find();
  return mealProvider;
};

const getSingleMealProvider = async (mealProvidersId: string) => {
  const mealProvider = await MealProvider.findById(mealProvidersId);
  return mealProvider;
};

export const MealProviderServise = {
  createMealProvider,
  getMealProvider,
  getAllMealProvider,
  getSingleMealProvider,
};
