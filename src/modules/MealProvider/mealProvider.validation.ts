import { z } from 'zod';

const createmealProviderValidation = z.object({
  body: z.object({
    mealProviderName: z.string().min(1, 'Meal Provider name is required.'),
    contactNumber: z.string().min(1, 'Contact number is required.'),
    website: z.string().url().nullable().optional(),
    ratings: z
      .number()
      .min(0, 'Ratings cannot be less than 0.')
      .max(5, 'Ratings cannot exceed 5.')
      .default(0),
    socialMediaLinks: z.record(z.string()).nullable().optional(),
  }),
});

export const MealProviderValidation = {
  createmealProviderValidation,
};
