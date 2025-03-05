import { UserRole } from "../../modules/User/user.interface";

export type VerifiedUser = {
   email: string;
   role: UserRole;
   iat: number;
   exp: number;
};
