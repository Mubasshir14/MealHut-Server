import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getReviewIntoDB = async () => {
  const result = await Review.find();
  return result;
};


const getProductReviewIntoDB = async (mealId?: string) => {
  const filter = mealId ? { mealId } : {}; 
  const result = await Review.find(filter);
  return result;
};


const getSingleProductReviewFromDB = async (id: string) => {
  try {
    const reviews = await Review.find({ meal: id });
    if (reviews.length === 0) {
      return { message: 'No reviews found for this meal.' };
    }
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { message: 'An error occurred while fetching reviews.' };
  }
};
export const ReviewService = {
  createReviewIntoDB,
  getReviewIntoDB,
  getSingleProductReviewFromDB,
  getProductReviewIntoDB
};
