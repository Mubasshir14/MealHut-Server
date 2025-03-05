import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { MealProviderServise } from './mealProvider.service';
import { IJwtPayload } from '../Auth/auth.interface';


const createMealProvider: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealProviderServise.createMealProvider(
    req.body,
    req.file,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    success: true,
    message: 'Meal Provider Account Created Successfully',
    statusCode: 201,
    data: result,
  });
});

const getMealProvider: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealProviderServise.getMealProvider(
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Meal Provider Account Retrive Successfully!',
    data: result,
  });
});

const getAllMealProvider: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealProviderServise.getAllMealProvider();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Meal Provider Account Retrive Successfully!',
    data: result,
  });
});

const getSingleMealProvider: RequestHandler = catchAsync(async (req, res) => {
  const { mealProvidersId } = req.params;
  const result = await MealProviderServise.getSingleMealProvider(mealProvidersId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Meal Provider Account Retrive Successfully!',
    data: result,
  });
});





export const mealProviderController = {
  createMealProvider,
  getMealProvider,
  getAllMealProvider,
  getSingleMealProvider,
};
