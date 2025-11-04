import mongoose, { Schema, models, model } from "mongoose";

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  pictures: string[];
  reviewCount: number;
  avgRating: number;
  discountedPrice: number;
  newArrival: boolean;
  bestSeller: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    category: { type: String },
    stock: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    avgRating: { type: Number, default: 5 },
    pictures: [{ type: String }],
    newArrival: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
