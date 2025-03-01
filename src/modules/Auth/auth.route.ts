import express from 'express';
import { AuthUserController } from './auth.controller';
import { UserValidation } from '../User/user.validation';
import validateRequest from '../../app/middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthUserController.userRegistration,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginUserValidationSchema),
  AuthUserController.userLogin,
);

router.post('/logout', AuthUserController.userLogout);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.mealProvider, USER_ROLE.customer),
  validateRequest(UserValidation.changePasswordValidationSchema),
  AuthUserController.changePassword,
);



router.post(
  '/reset-password',
  validateRequest(UserValidation.forgetPasswordValidationSchema),
  AuthUserController.resetPassword,
);

router.post(
  '/refresh-token',
  AuthUserController.refreshToken,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.mealProvider, USER_ROLE.customer),
  AuthUserController.getMe,
);

router.get('/user', auth(USER_ROLE.admin), AuthUserController.getUser);

export const AuthRoutes = router;
