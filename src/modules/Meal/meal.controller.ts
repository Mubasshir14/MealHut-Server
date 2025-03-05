import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { IJwtPayload } from '../Auth/auth.interface';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { MealService } from './meal.service';

const createMeal: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealService.createMeal(
    req.body,
    req.files,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meal created successfully',
    data: result,
  });
});

const getAllMeal: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealService.getAllMeal();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meals are retrieved successfully',
    data: result,
  });
});

const getSingleMeal: RequestHandler = catchAsync(async (req, res) => {
  const { mealId } = req.params;
  const result = await MealService.getSingleMeal(mealId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meal retrieved successfully',
    data: result,
  });
});

const updateMeal: RequestHandler = catchAsync(async (req, res) => {
  const {
    user,
    body: payload,
    params: { mealId },
  } = req;

  const result = await MealService.updateMeal(
    mealId,
    payload,
    req.files,
    user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meal updated successfully',
    data: result,
  });
});

const deleteMeal: RequestHandler = catchAsync(async (req, res) => {
  const {
    user,
    params: { mealId },
  } = req;

  const result = await MealService.deleteMeal(mealId, user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meal deleted successfully',
    data: result,
  });
});

export const MealController = {
  createMeal,
  getAllMeal,
  getSingleMeal,
  updateMeal,
  deleteMeal,
};
