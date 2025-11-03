import mongoose, { Schema, models, model } from "mongoose";
import { ProductSchema } from "./Product";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Buyer' },
    isVerified: { type: Boolean, default: false },
    address: [{ type: String, default: '' }],
    savedItems: [{ type: ProductSchema, default: [] }]
  }, 
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
