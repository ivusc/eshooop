import mongoose, { Schema, models, model } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId,
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  pictures: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    pictures: [{ type: String }],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
