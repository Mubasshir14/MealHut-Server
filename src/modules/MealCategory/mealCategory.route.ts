import { MealCategoryController } from './mealCategory.controller';
import auth from '../../app/middlewares/auth';

import validateRequest from '../../app/middlewares/validateRequest';
import { MealCategoryValidation } from './mealCategory.validation';
import { UserRole } from '../User/user.interface';
import { Router } from 'express';

const router = Router();

// router.post(
//   '/',
//   auth(UserRole.MEALPROVIDER),
//   .single('icon'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(MealCategoryValidation.createMealCategoryValidationSchema),
//   MealCategoryController.createMealCategory,
// );

router.get('/', MealCategoryController.getAllMealCategories);
router.get('/:id', MealCategoryController.getMealCategoryById);

router.put(
  '/:id',
  auth(UserRole.MEALPROVIDER),
  validateRequest(MealCategoryValidation.updateMealCategoryValidationSchema),
  MealCategoryController.updateMealCategory,
);
router.delete(
  '/:id',
  auth(UserRole.MEALPROVIDER),
  MealCategoryController.deleteMealCategory,
);

export const MealcategoryRoute = router;
