import express from 'express';
import auth from '../../app/middlewares/auth';
import { ReviewController } from './review.controller';
import { UserRole } from '../User/user.interface';
const router = express.Router();

router.post('/', auth(UserRole.CUSTOMER), ReviewController.createReview);
router.get('/', ReviewController.getReview);
router.get('/food', ReviewController.getProductReview);
router.get('/:id', ReviewController.getProductReview);

export const ReviewRoutes = router;
