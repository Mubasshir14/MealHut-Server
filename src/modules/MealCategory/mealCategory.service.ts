/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from '../User/user.interface';
import { TMealCategory } from './mealCategory.interface';
import { MealCategory } from './mealCategory.model';

const createCategory = async (
  categoryData: Partial<TMealCategory>,
  icon: any,
  authUser: TUser,
) => {
  const category = new MealCategory({
    ...categoryData,
    createdBy: authUser.userId,
    icon: icon?.path,
  });

  const result = await category.save();

  return result;
};

const getAllCategories = async () => {
  return await MealCategory.find({});
};

const getCategoryById = async (id: string) => {
  return await MealCategory.findById(id);
};

const updateCategory = async (
  id: string,
  categoryData: Partial<TMealCategory>,
  icon: any,
) => {
  return await MealCategory.findByIdAndUpdate(
    id,
    { ...categoryData, icon: icon?.path },
    { new: true, runValidators: true },
  );
};

const deleteCategory = async (id: string) => {
  return await MealCategory.findByIdAndDelete(id);
};

export const MealCategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
