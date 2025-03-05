import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { IJwtPayload } from '../Auth/auth.interface';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../app/utils/sendResponse';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.createOrder(
    req.body,
    req.user as IJwtPayload,
  );
  console.log(result);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order created succesfully',
    data: result,
  });
});

const getOrders: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.getOrders();
 
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getSingleOrder: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.getSingleOrder(req.params.orderId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getMyOrders: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.getMyOrders(req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const updateOrder: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await OrderService.updateOrder(id, status);
  sendResponse(res, {
    success: true,
    message: 'Order updated successfully',
    statusCode: 200,
    data: result,
  });
});
export const OrderController = {
  createOrder,
  getOrders,
  getSingleOrder,
  getMyOrders,
  updateOrder
};
