"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function getOrder(userId: string){
  await connectToDatabase();
  const order = await Order.findOne({ user: userId, paymentStatus: "paid" })
    .sort({ createdAt: -1 })
    .populate("items.product")
    .lean();

  return JSON.parse(JSON.stringify(order))
}