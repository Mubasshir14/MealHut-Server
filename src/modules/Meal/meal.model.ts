import { Schema, model } from 'mongoose';
import { TMeal } from './meal.interface';

const MealSchema = new Schema<TMeal>(
  {
    name: {
      type: String,
      required: [true, 'Meal name is required'],
      unique: true,
      trim: true,
    },
    imageUrls: {
      type: [String],
      required: [true, 'Meal images are required'],
    },
    price: {
      type: Number,
      required: [true, 'Meal price is required'],
      min: 0,
    },
    calories: {
      type: String,
      required: [true, 'Calorie count is required'],
      min: 0,
    },
    category: {
      // type: Schema.Types.ObjectId,
      type: String,
      // ref: 'MealCategory',
      required: [true, 'Category is required'],
    },
    mealProvider: {
      type: Schema.Types.ObjectId,
      ref: 'MealProvider',
      required: [true, 'Meal provider is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Meal provider is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ingredients: {
      type: String,
      required: [true, 'Ingredients are required'],
      trim: true,
    },
    portion_size: {
      type: String,
      required: [true, 'Portion size is required'],
      trim: true,
    },
    why_eat: {
      type: String,
      required: [true, 'Reason to eat is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Meal = model<TMeal>('Meal', MealSchema);
