import mongoose, { Schema, models } from "mongoose";

const tokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const PasswordResetToken =
  models.PasswordResetToken ||
  mongoose.model("PasswordResetToken", tokenSchema);
