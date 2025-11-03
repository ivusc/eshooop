"use server"

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Review from "@/models/Review";
import mongoose from "mongoose";

export async function getReviews(productId: string) {
  await connectToDatabase();

  const reviews = await Review.find({ product: productId })
    .populate("user", "username email")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(reviews));
}

export async function createReview(userId: string, productId: string, rating: number, comment: string) {
  await connectToDatabase();

  //const existing = await Review.findOne({ user: userId, product: productId });
  //if (existing) return { success: false, message: "You have already reviewed this product." };

  const review = await Review.create({
    user: userId,
    product: productId,
    rating,
    comment
  });

  const stats = await Review.aggregate([
    {
      $match: { product: new mongoose.Types.ObjectId(productId) },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);
  console.log(stats);
  const { averageRating = 0, reviewCount = 0 } = stats[0] || {};

  const product = await Product.findByIdAndUpdate(productId, {
    avgRating: Number(averageRating.toFixed(2)),
    reviewCount,
  });

  
  console.log(review);
  console.log(product);

  return { success: true, message: "Review successfully created." };
}