import mongoose, { Schema, models, model } from "mongoose";
import { IProduct } from "./Product";

export interface IAddress {
  label?: string; // e.g. Home, Office
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  picture: string;
  savedProducts: IProduct[] | mongoose.Types.ObjectId[];
  address: IAddress[];
  phone: number;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    label: { type: String, default: "Home" }, // e.g. Home, Office
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false } // prevent separate ObjectIds for each address
);

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
    address: { type: [AddressSchema], default: [] },
    savedProducts: [
      { type: Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
