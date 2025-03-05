import { StatusCodes } from 'http-status-codes';
import User from '../User/user.model';
import AppError from '../../app/errors/AppError';
import { MealProvider } from '../MealProvider/mealProvider.model';

export const hasActiveMealProvider = async (userId: string) => {
  const isUserExists = await User.checkUserExist(userId);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (!isUserExists.provider) {
    throw new AppError(StatusCodes.BAD_REQUEST, "You are not food provider!");
  }

  const mealProvider = await MealProvider.findOne({ user: isUserExists._id })
  

  return mealProvider;
};
