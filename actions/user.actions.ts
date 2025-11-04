"use server";

import { connectToDatabase } from "@/lib/mongodb";
import User, { IAddress } from "@/models/User";
import { Types } from "mongoose";

export async function getUsers() {
  await connectToDatabase();
  const users = await User.find().lean();
  return JSON.parse(JSON.stringify(users));
}

export async function getUser(email: string) {
  await connectToDatabase();
  const user = await User.findOne({ email }).select({
    username: 1,
    email: 1,
    phone: 1,
    picture: 1,
    role: 1,
    savedProducts: 1
  });
  //console.log(user);
  return JSON.parse(JSON.stringify(user));
}

export async function getFullUserDetails(email: string) {
  await connectToDatabase();
  const user = await User.findOne({ email })
    .populate({
      path: "savedProducts",
      model: "Product",
      select: "name price pictures avgRating reviewCount category stock", // only needed fields
    })
    .populate("address")
    .lean(); // return plain JS object instead of Mongoose doc
  return JSON.parse(JSON.stringify(user));
}

export async function updateProfile(
  userId: string,
  username: string,
  email: string,
  phone: number,
  picture: string
) {
  await connectToDatabase();

  const user = await User.findById(userId).lean();
  if (!user) return { success: false, message: "User not found" };

  const newUser = await User.findByIdAndUpdate(userId, {
    username,
    email,
    phone: phone,
    picture,
  });

  console.log(newUser, 46);

  return { success: true, message: "User details successfully updated." };
}

// Add a saved product
export async function saveProduct(userId: string, productId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    const isSaved = user.savedProducts.some(
      (p: Types.ObjectId) => p.toString() === productId
    );

    if (isSaved) {
      // remove
      await User.findByIdAndUpdate(userId, {
        $pull: { savedProducts: productId },
      });
    } else {
      // add
      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedProducts: productId },
      });
    }

    return {
      success: true,
      message: isSaved ? "Removed from saved product!" : "Saved product!",
    };
  } catch (error) {
    console.error("Error toggling saved product:", error);
    return { success: false, message: "Unable to save product." };
  }
}

// Add an address
export async function addAddress(userId: string, address: IAddress) {
  await connectToDatabase();
  await User.findByIdAndUpdate(
    userId,
    { $push: { addresses: address } },
    { new: true }
  );
}
