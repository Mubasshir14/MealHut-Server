import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { MealProviderServise } from './mealProvider.service';
import { TUser } from '../User/user.interface';

const createMealProvider: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealProviderServise.createMealProvider(
    req.body,
    req.file,
    req.user as TUser,
  );

  sendResponse(res, {
    success: true,
    message: 'Meal Provider Account Created Successfully',
    statusCode: 201,
    data: result,
  });
});

const getMealProvider: RequestHandler = catchAsync(async (req, res) => {
    const result = await (
        req.user as TUser
      );
    
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Meal Provider Account Retrive Successfully!',
        data: result
      });
  });

export const mealProviderController = {
  createMealProvider,
  getMealProvider
};
