import { model, Schema } from 'mongoose';
import { Meal } from '../Meal/meal.model';
import { IOrder } from './morder.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userEmail: {
      type: String,
    },
    name: {
      type: String,
    },
    // mealProvider: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'MealProvider',
    // },

    meals: [
      {
        meal: {
          type: Schema.Types.ObjectId,
          ref: 'Meal',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        imageUrls: {
          type: [String], 
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      min: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    mealProvider: { type: String },
    shippingAddress: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('validate', async function (next) {
  let totalAmount = 0;

  for (const item of this.meals) {
    const meal = await Meal.findById(item.meal);

    if (!meal) {
      return next(new Error(`Meal not found!`));
    }

    totalAmount += item.price;
  }

  const deliveryCharge = 60;
  const finalDiscount = 0;

  this.totalAmount = totalAmount;
  this.deliveryCharge = deliveryCharge;
  this.finalAmount = totalAmount - finalDiscount + deliveryCharge;

  next();
});

export const Order = model<IOrder>('Order', orderSchema);
