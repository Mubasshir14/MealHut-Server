import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';

import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { UserRole } from '../../modules/User/user.interface';
import AppError from '../errors/AppError';
import User from '../../modules/User/user.model';


const auth = (...requiredRoles: UserRole[]) => {
   return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
         const token = req.headers.authorization;

         if (!token) {
            throw new AppError(
               StatusCodes.UNAUTHORIZED,
               'You are not authorized!'
            );
         }

         try {
            const decoded = jwt.verify(
               token,
               config.jwt_access_secret as string
            ) as JwtPayload;

            const { role, email } = decoded;

            const user = await User.findOne({ email, role, isActive: true });

            if (!user) {
               throw new AppError(
                  StatusCodes.NOT_FOUND,
                  'This user is not found!'
               );
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
               throw new AppError(
                  StatusCodes.UNAUTHORIZED,
                  'You are not authorized!'
               );
            }

            req.user = decoded as JwtPayload & { role: string };
            next();
         } catch (error) {
            if (error instanceof TokenExpiredError) {
               return next(
                  new AppError(
                     StatusCodes.UNAUTHORIZED,
                     'Token has expired! Please login again.'
                  )
               );
            }
            return next(
               new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token!')
            );
         }
      }
   );
};

export default auth;
