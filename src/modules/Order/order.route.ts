import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import { OrderController } from './order.controller';
import auth from '../../app/middlewares/auth';

const router = Router();

router.post('/', auth(UserRole.CUSTOMER), OrderController.createOrder);
router.get(
  '/',
  auth(UserRole.CUSTOMER, UserRole.CUSTOMER),
  OrderController.getOrders,
);
router.patch(
  '/:id',
  auth(UserRole.CUSTOMER, UserRole.CUSTOMER),
  OrderController.updateOrder,
);

export const OrderRoutes = router;
