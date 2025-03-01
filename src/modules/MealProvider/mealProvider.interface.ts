import { Schema } from 'mongoose';

export interface IMealProvider extends Document {
  mealProviderName: string;
  contactNumber: string;
  website?: string;
  user?: Schema.Types.ObjectId;
  mealsOffered: string[];
  ratings?: number;
  socialMediaLinks?: Map<string, string>;
  logo?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
