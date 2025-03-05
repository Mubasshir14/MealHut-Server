import { z } from 'zod';

const createMealValidation = z.object({
  body: z.object({
    name: z.string().min(2, 'Meal name must be at least 2 characters'),
    price: z.number().min(0, 'Price must be a positive number'),
    calories: z.string().min(1, 'Calorie count is required'),

    ingredients: z.string().min(3, 'Ingredients description is required'),
    portion_size: z.string().min(3, 'Portion size is required'),
    why_eat: z.string().min(3, 'Reason to eat is required'),
  }),
});

const updateMealValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Meal name must be at least 2 characters')
      .optional(),
    imageUrls: z.string().url('Invalid image URL').optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    calories: z.string().min(1, 'Calorie count is required').optional(),
    category: z
      .string({
        required_error: 'Category ID is required',
      })
      .min(1, 'Category ID cannot be empty')
      .optional(),
    

    ingredients: z.string().min(3, 'Ingredients description is required'),
    portion_size: z.string().min(3, 'Portion size is required'),
    why_eat: z.string().min(3, 'Reason to eat is required'),
  }),
});

export const MealValidation = {
  createMealValidation,
  updateMealValidation,
};
