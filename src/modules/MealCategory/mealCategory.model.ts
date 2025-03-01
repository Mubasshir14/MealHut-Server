import { model, Model, Schema } from 'mongoose';
import { TMealCategory } from './mealCategory.interface';

const mealCategorySchema = new Schema<TMealCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MealCategory: Model<TMealCategory> = model<TMealCategory>(
    'MealCategory',
    mealCategorySchema
  );
