import mongoose, { Schema, Document, models } from "mongoose";
import { IProduct } from "./Product";

export interface ICartItem {
  product: mongoose.Types.ObjectId | IProduct;
  quantity: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // each user has only one cart
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
