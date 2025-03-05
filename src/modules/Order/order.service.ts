/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { IJwtPayload } from '../Auth/auth.interface';
import { Meal } from '../Meal/meal.model';
import { IOrder } from './morder.interface';
import { Order } from './order.model';
import User from '../User/user.model';
import { MealProvider } from '../MealProvider/mealProvider.model';
import AppError from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { sendEmail } from '../../app/utils/sendEmails';

const createOrder = async (
  orderData: Partial<IOrder>,
  authUser: IJwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = new Order({
      ...orderData,
      user: authUser.userId,
      userEmail: authUser.email,
    });

    const createdOrder = await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    await sendEmail(
      authUser.email,
      `<p>Your order has been placed successfully. Order ID: <strong>${createdOrder._id}</strong></p>`,
      'Order Confirmation - MealHut',
      'Thank you for ordering from MealHut!',
    );

    return createdOrder;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error creating order');
  }
};

const getOrders = async () => {
  const result = await Order.find();
  return result;
};

const getSingleOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not Found');
  }
  return order;
};

const getMyOrders = async (authUser: IJwtPayload) => {
  const result = await Order.find({ user: authUser.userId });
  return result;
};

const updateOrder = async (
  id: string,
  status: string,
): Promise<IOrder | null> => {
  const allowedStatuses = ['Processing', 'Cancelled'];
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  if (order.status === 'Processing' || order.status === 'Cancelled') {
    throw new AppError(
      500,
      'Cannot modify order status once shipped or cancelled',
    );
  }

  const result = await Order.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (result && status === 'Processing') {
    await sendEmail(
      order.userEmail,
      `<p>Your order <strong>${order._id}</strong> has been accepted and is now in processing. Thank you!</p>`,
      'Order Update - MealHut',
      'Your order is now being processed.'
    );
  }

  return result;
};


export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
  getMyOrders,
  updateOrder,
};
