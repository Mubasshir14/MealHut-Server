import { Router } from 'express';
import { MealController } from './meal.controller';
import { UserRole } from '../User/user.interface';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import validateRequest from '../../app/middlewares/validateRequest';
import { MealValidation } from './meal.validation';
import auth from '../../app/middlewares/auth';

const router = Router();

router.get('/', MealController.getAllMeal);

router.get('/:mealId', MealController.getSingleMeal);

router.post(
  '/',
  auth(UserRole.MEALPROVIDER),
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  validateRequest(MealValidation.createMealValidation),
  MealController.createMeal,
);

router.patch(
  '/:mealId',
  auth(UserRole.MEALPROVIDER),
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  MealController.updateMeal,
);

router.delete(
  '/:mealId',
  auth(UserRole.MEALPROVIDER),
  MealController.deleteMeal,
);

export const MealRoutes = router;
