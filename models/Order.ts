import mongoose, { Schema, models } from "mongoose";
import { ICartItem } from "./Cart";

export interface IOrderItem extends ICartItem {
  price: number
}

export interface IOrder {
  _id: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  items: IOrderItem[],
  total: number,
  paymentStatus: "pending" | "paid" | "failed",
  stripeSessionId: string,
  createdAt: Date,
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
},{ _id: false });

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      default: [],
    },
    total: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    stripeSessionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);
export default Order;
