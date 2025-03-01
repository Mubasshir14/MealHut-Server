import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { MealProviderValidation } from './mealProvider.validation';
import { mealProviderController } from './mealProvider.controller';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { upload } from '../../app/utils/sendImageToImageCloudinary';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.customer),
  upload.single('logo'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(MealProviderValidation.createmealProviderValidation),
  mealProviderController.createMealProvider,
);

router.get(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  mealProviderController.getMealProvider,
);

export const MealProviderRoute = router;
