/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IMealProvider } from './mealProvider.interface';
import { User } from '../User/user.model';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { MealProvider } from './mealProvider.model';
import { TUser } from '../User/user.interface';

const createMealProvider = async (
  mealProviderdata: Partial<IMealProvider>,
  logo: any,
  authUser: TUser,
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
      { hasShop: true },
      { new: true, session },
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return createdMealProvider;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMealProvider = async (authUser: TUser) => {
  const existingUser = await User.isUserExists(authUser.userId);
  if (!existingUser.hasShop) {
    throw new AppError(httpStatus.NOT_FOUND, 'You have no shop!');
  }

  const mealProvider = await MealProvider.findOne({
    user: existingUser._id,
  }).populate('user');
  return mealProvider;
};

export const MealProviderServise = {
  createMealProvider,
  getMealProvider
};
