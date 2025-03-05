import express from 'express';
import clientInfoParser from '../../app/middlewares/clientInfoParser';

import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { AuthController } from './auth.controller';


const router = express.Router();

router.post('/login', clientInfoParser, AuthController.userLogin);

router.post(
   '/refresh-token',
   AuthController.refreshToken
);

router.post(
   '/change-password',
   auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.MEALPROVIDER),
   AuthController.changePassword
);


export const AuthRoutes = router;
