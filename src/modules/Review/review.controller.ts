import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { ReviewService } from './review.service';

const createReview: RequestHandler = catchAsync(async (req, res) => {
  const { userName, mealId, rating, comment } = req.body;
  if (!userName || !mealId || !rating || !comment) {
    throw new Error(
      'All fields (userName, mealId, rating, comment) are required',
    );
  }
  const result = await ReviewService.createReviewIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Review Createsuccessfully',
    statusCode: 200,
    data: result,
  });
});

const getReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewService.getReviewIntoDB();
  sendResponse(res, {
    success: true,
    message: 'Review fetched successfully',
    statusCode: 200,
    data: result,
  });
});

const getProductReview: RequestHandler = catchAsync(async (req, res) => {
  const mealId = req.query.mealId as string; 

  const result = await ReviewService.getProductReviewIntoDB(mealId); 

  sendResponse(res, {
    success: true,
    message: "Reviews fetched successfully",
    statusCode: 200,
    data: result,
  });
});


const getSingleProductReview: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.getSingleProductReviewFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Review fetched successfully',
    statusCode: 200,
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReview,
  getSingleProductReview,
  getProductReview
};
