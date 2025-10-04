import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    images: [{ type: String }], 
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;