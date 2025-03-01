import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';

const ReviewSchema = new Schema<TReview>(
  {
    reviewText: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      model: {
        type: String,
      },
      image: {
        type: String,
      },
      rating: {
        type: Number,
        required: true,
      },
    meal: {
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
