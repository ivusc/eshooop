import mongoose, { Schema, models } from "mongoose";
import { IUser } from "./User";
import { IProduct } from "./Product";

export interface IReview {
  _id: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId | IUser,
  product: mongoose.Types.ObjectId | IProduct,
  rating: number,
  comment: string,
  createdAt: Date,
  updatedAt: Date,
}

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

const Review = models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
