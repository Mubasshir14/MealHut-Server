export type TLoginUser = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  userId: string;
  name: string;
  email: string;
  hasShop: boolean;
  role: 'customer' | 'mealProvider' | 'admin';
  isActive: boolean;
}