import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import validateRequest from '../../app/middlewares/validateRequest';
import { MealProviderValidation } from './mealProvider.validation';
import { mealProviderController } from './mealProvider.controller';

const router = Router();

router.post(
  '/',
  auth(UserRole.CUSTOMER),
  multerUpload.single('logo'),
  parseBody,
  validateRequest(MealProviderValidation.createmealProviderValidation),
  mealProviderController.createMealProvider,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.MEALPROVIDER),
  mealProviderController.getMealProvider,
);

router.get(
  '/mealProvider',
  mealProviderController.getAllMealProvider,
);
router.get(
  '/:mealProvidersId',
  mealProviderController.getSingleMealProvider,
);

export const MealProviderRoute = router;
