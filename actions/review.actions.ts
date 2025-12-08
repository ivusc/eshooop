"use server"

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Review from "@/models/Review";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function getReviews(productId: string) {
  await connectToDatabase();

  const reviews = await Review.find({ product: productId })
    .populate("user", "_id username email")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(reviews));
}

export async function getReviewsByUser(userId: string) {
  await connectToDatabase();

  const reviews = await Review.find({ user: userId })
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

export async function deleteReview(reviewId: string) {
  try {
    await connectToDatabase();

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return {
        success: false,
        message: "Review not found",
      };
    }

    revalidatePath("/");
    revalidatePath("/products");

    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      message: "Failed to delete review",
    };
  }
}

export async function editReview(
  reviewId: string,
  { rating, comment }: { rating: number; comment: string }
) {
  try {
    await connectToDatabase();

    if (rating < 1 || rating > 5) {
      return {
        success: false,
        message: "Rating must be between 1 and 5",
      };
    }

    if (!comment || comment.trim().length === 0) {
      return {
        success: false,
        message: "Comment cannot be empty",
      };
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      {
        rating,
        comment,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!review) {
      return {
        success: false,
        message: "Review not found",
      };
    }

    return {
      success: true,
      message: "Review updated successfully",
      review: JSON.parse(JSON.stringify(review)),
    };
  } catch (error) {
    console.error("Error editing review:", error);
    return {
      success: false,
      message: "Failed to update review",
    };
  }
}