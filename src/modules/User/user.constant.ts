export const USER_ROLE = {
  customer: 'customer',
  admin: 'admin',
  mealProvider: 'mealProvider',
} as const;

export const UserSearchableFields = [
  'email',
  'name',
  'role'
];
