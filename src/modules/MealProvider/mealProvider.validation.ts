import { z } from 'zod';

const createmealProviderValidation = z.object({
  body: z.object({
    shopName: z.string().min(1, 'Meal Provider name is required.'),
    contactNumber: z.string().min(1, 'Contact number is required.'),
    website: z.string().url().nullable().optional(),
    mealsOffered: z
      .array(z.string())
      .min(1, 'At least one service must be offered.'),
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
