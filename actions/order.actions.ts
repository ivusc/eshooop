"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { Types } from "mongoose";

export async function getLastOrder(userId: string){
  await connectToDatabase();
  const order = await Order.findOne({ user: userId, status: "paid" })
    .sort({ createdAt: -1 })
    .populate("items.product")
    .lean();

  return JSON.parse(JSON.stringify(order));
}

export async function getOrder(userId: string, orderId: string) {
  await connectToDatabase();
  
  const order = await Order.findOne({ _id: orderId, user: userId})
    .populate('items.product')
    .lean();
  
  if (!order) return { success: false, message: "Order not found" };

  return JSON.parse(JSON.stringify(order));
}

export async function getOrdersByUser(userId: string) {
  await connectToDatabase();

  const orders = await Order.find({ user: userId })
    .populate('items.product')
    .sort({ createdAt: -1 })
    .lean();
  
  if (!orders) return { success: false, message: "Orders not found" };

  return JSON.parse(JSON.stringify(orders));
}

export async function getTotalOrders(userId: string) {
  await connectToDatabase();

  const result = await Order.aggregate([
    { $match: { user: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$user",
        totalAmount: { $sum: "$total" },
        orderCount: { $sum: 1 },
      },
    },
  ]);

  if (!result) return { success: false, message: 'Orders not found.' }

  if (result.length === 0) {
    return { total: 0, count: 0 };
  }
  
  return {
    total: result[0].totalAmount,
    count: result[0].orderCount,
    success: true
  };
}