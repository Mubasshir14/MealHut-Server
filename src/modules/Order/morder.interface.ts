import { Types } from 'mongoose';

export interface IOrderMeal {
  meal: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  userEmail:string;
  name: string;
  // mealProvider: Types.ObjectId;
  specification?: string;
  meals: IOrderMeal[];
  totalAmount: number;
  deliveryCharge: number;
  finalAmount: number;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  shippingAddress: string;
  mealProvider: string;
}
