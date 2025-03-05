import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { UserRoutes } from '../../modules/User/user.route';
import { MealProviderRoute } from '../../modules/MealProvider/mealProvider.route';
import { MealRoutes } from '../../modules/Meal/meal.route';
import { ReviewRoutes } from '../../modules/Review/review.route';
import { OrderRoutes } from '../../modules/Order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/meal-provider',
    route: MealProviderRoute,
  },
  {
    path: '/meal',
    route: MealRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
