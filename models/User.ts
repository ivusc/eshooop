import mongoose, { Schema, models, model } from "mongoose";
import { IProduct } from "./Product";
import { IAddress } from "./Address";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  picture: string;
  savedProducts: IProduct[] | mongoose.Types.ObjectId[];
  address: IAddress[] | mongoose.Types.ObjectId[];
  phone: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Buyer" },
    isVerified: { type: Boolean, default: false },
    picture: { type: String },
    phone: { type: Number, default: 0 },
    address: [
      { type: Schema.Types.ObjectId, ref: "Address", default: [] },
    ],
    savedProducts: [
      { type: Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
