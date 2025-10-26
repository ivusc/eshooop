import mongoose, { Schema, models, model, Document } from "mongoose";

// export interface IProductReviewSchema extends Document {
//   product: mongoose.Types.ObjectId | IProduct;
//   review: string;
//   user: mongoose.Types.ObjectId;
// }

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

// const ProductReviewSchema = new Schema({

// })

const ProductSchema = new Schema<IProduct>(
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
