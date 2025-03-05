/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { IJwtPayload } from '../Auth/auth.interface';
import { TMeal } from './meal.interface';
import { Meal } from './meal.model';
import { hasActiveMealProvider } from './utils';
import User from '../User/user.model';
import { MealProvider } from '../MealProvider/mealProvider.model';

// create
const createMeal = async (
  productData: Partial<TMeal>,
  productImages: any,
  authUser: IJwtPayload,
) => {
  const provider = await hasActiveMealProvider(authUser.userId);
  if (!provider) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Active meal provider is required.',
    );
  }

  const { images } = productImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Meal images are required.');
  }

  productData.imageUrls = images.map((image: any) => image.path);

  const newMeal = new Meal({
    ...productData,
    user: authUser.userId,
    mealProvider: provider._id,
  });

  const result = await newMeal.save();
  return result;
};

// get all
const getAllMeal = async () => {
  const meals = await Meal.find();;
  return meals;
};

// single get
const getSingleMeal = async (mealId: string) => {
  const meal = await Meal.findById(mealId);
  if (!meal) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return meal;
};

// update
const updateMeal = async (
  mealId: string,
  payload: Partial<TMeal>,
  productImages: any,
  authUser: IJwtPayload,
) => {
  const { images } = productImages;

  const user = await User.findById(authUser.userId);
  const provider = await MealProvider.findOne({ user: user?._id });
  const meal = await Meal.findOne({
    _id: mealId,
  });

  if (!user?.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
  }
  if (!provider) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You are not a meal provider');
  }

  if (!meal) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
  }

  if (images && images.length > 0) {
    payload.imageUrls = images.map((image: any) => image.path);
  }

  return await Meal.findByIdAndUpdate(mealId, payload, { new: true });
};

// delete
const deleteMeal = async (mealId: string, authUser: IJwtPayload) => {
  const user = await User.findById(authUser.userId);
  const provider = await MealProvider.findOne({ user: user?._id });
  const meal = await Meal.findOne({
    _id: mealId,
  });

  if (!user?.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
  }
  if (!provider) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You are not a provider');
  }
  if (!meal) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Meal Not Found');
  }

  return await Meal.findByIdAndDelete(mealId);
};

export const MealService = {
  createMeal,
  getSingleMeal,
  updateMeal,
  deleteMeal,
  getAllMeal,
};
