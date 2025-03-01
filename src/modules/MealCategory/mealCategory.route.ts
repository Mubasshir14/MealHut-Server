import { NextFunction, Request, Response, Router } from 'express';
import { MealCategoryController } from './mealCategory.controller';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../app/middlewares/validateRequest';
import { MealCategoryValidation } from './mealCategory.validation';
import { upload } from '../../app/utils/sendImageToImageCloudinary';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.mealProvider),
  upload.single('icon'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(MealCategoryValidation.createMealCategoryValidationSchema),
  MealCategoryController.createMealCategory,
);

router.get('/', MealCategoryController.getAllMealCategories);
router.get('/:id', MealCategoryController.getMealCategoryById);

router.put(
  '/:id',
  auth(USER_ROLE.mealProvider),
  validateRequest(MealCategoryValidation.updateMealCategoryValidationSchema),
  MealCategoryController.updateMealCategory,
);
router.delete(
  '/:id',
  auth(USER_ROLE.mealProvider),
  MealCategoryController.deleteMealCategory,
);

export const MealcategoryRoute = router;
