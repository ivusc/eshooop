"use server"

import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";

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

  const review = await Review.create({
    user: userId,
    product: productId,
    rating,
    comment
  });
  console.log(review);

  return { success: true, message: "Review successfully created." };
}