import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { TUser } from '../User/user.interface';
import sendResponse from '../../app/utils/sendResponse';
import { MealCategoryService } from './mealCategory.service';

const createMealCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealCategoryService.createCategory(
    req.body,
    req.file,
    req.user as TUser,
  );

  sendResponse(res, {
    success: true,
    message: 'Meal Category created succesfully',
    statusCode: 201,
    data: result,
  });
});

const getAllMealCategories: RequestHandler = catchAsync(async (_, res) => {
  const result = await MealCategoryService.getAllCategories();

  sendResponse(res, {
    success: true,
    message: 'Meal Categories fetched successfully',
    statusCode: 200,
    data: result,
  });
});

const getMealCategoryById: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealCategoryService.getCategoryById(req.params.id);

  sendResponse(res, {
    success: !!result,
    message: result ? 'Meal Category found' : 'Meal Category not found',
    statusCode: result ? 200 : 404,
    data: result,
  });
});

const updateMealCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealCategoryService.updateCategory(
    req.params.id,
    req.body,
    req.file,
  );

  sendResponse(res, {
    success: !!result,
    message: result
      ? 'Meal Category updated successfully'
      : 'Meal Category not found',
    statusCode: result ? 200 : 404,
    data: result,
  });
});


const deleteMealCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await MealCategoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    success: !!result,
    message: result
      ? 'Meal Category deleted successfully'
      : 'Meal Category not found',
    statusCode: result ? 200 : 404,
    data: result,
  });
});

export const MealCategoryController = {
  createMealCategory,
  getAllMealCategories,
  getMealCategoryById,
  updateMealCategory,
  deleteMealCategory,
};
