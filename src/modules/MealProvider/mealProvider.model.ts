import mongoose, { Model, Schema } from 'mongoose';
import { IMealProvider } from './mealProvider.interface';

const mealProviderSchema = new Schema<IMealProvider>(
  {
    mealProviderName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    servicesOffered: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    mealsOffered: {
      type: [String],
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    socialMediaLinks: {
      type: Map,
      of: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MealProvider: Model<IMealProvider> = mongoose.model(
  'MealProvider',
  mealProviderSchema,
);
