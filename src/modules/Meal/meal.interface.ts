import { Types } from 'mongoose';

export interface TMeal {
  name: string;
  imageUrls: string[];
  price: number;
  calories: string;
  category: string;
  user: Types.ObjectId;
  mealProvider: Types.ObjectId;
  isActive: boolean;
  ingredients: string;
  portion_size: string;
  why_eat: string;
}
