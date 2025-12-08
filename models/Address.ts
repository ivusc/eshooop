import { connectToDatabase } from "@/lib/mongodb";
import mongoose, { models, Schema } from "mongoose";

export interface IAddress {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
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

const AddressSchema = new Schema<IAddress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: { type: String, default: "Home" }, // e.g. Home, Office
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  }
);

const Address = models.Address || mongoose.model<IAddress>("Address", AddressSchema, "addresses");
export default Address;