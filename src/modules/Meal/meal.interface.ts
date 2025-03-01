import { Types } from 'mongoose';

export interface TMeal {
  name: string;
  imageUrls: string;
  price: number;
  calories: string;
  category: Types.ObjectId;
  mealProvider: Types.ObjectId;
  averageRating?: number;
  ratingCount?: number;
  description: {
    ingredients: string;
    portion_size: string;
    why_eat: string;
  };
}
