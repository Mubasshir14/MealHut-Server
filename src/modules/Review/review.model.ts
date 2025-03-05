import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';

const ReviewSchema = new Schema<TReview>(
  {
    userName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    mealId: {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('Review', ReviewSchema);
