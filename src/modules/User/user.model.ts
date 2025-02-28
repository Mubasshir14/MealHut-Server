import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../app/config';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ['customer', 'mealProvider', 'admin'],
      default: 'customer',
    },
    phone: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', UserSchema);
