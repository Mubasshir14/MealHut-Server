import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRole } from "./user.interface";
import auth from "../../app/middlewares/auth";
import validateRequest from "../../app/middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import clientInfoParser from "../../app/middlewares/clientInfoParser";
// import { parseBody } from "../../app/middlewares/bodyParse";

const router = Router();

router.get('/', auth(UserRole.ADMIN), UserController.getAllUser);

router.get('/me', auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.MEALPROVIDER), UserController.myProfile);

router.post(
   '/register',
   clientInfoParser,
   validateRequest(UserValidation.userValidationSchema),
   UserController.registerUser
);


router.patch(
   '/update-profile',
   auth(UserRole.CUSTOMER, UserRole.MEALPROVIDER, UserRole.ADMIN),
   // multerUpload.single('profilePhoto'),
   // parseBody,
   UserController.updateProfile
);

router.patch(
   '/:id/status',
   auth(UserRole.ADMIN),
   UserController.updateUserStatus
);

export const UserRoutes = router;
