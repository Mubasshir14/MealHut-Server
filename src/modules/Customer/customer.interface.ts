import { IUser } from "../User/user.interface";


export interface ICustomer extends Document {
  phoneNo?: string;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  address?: string;
  photo?: string; 
  user?: IUser['_id'];
}
