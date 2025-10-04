"use server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function getUsers() {
  await connectToDatabase();
  const users = await User.find().lean();
  return JSON.parse(JSON.stringify(users));
}

export async function getUser(email: string){
  await connectToDatabase();
  const user = await User.findOne({ email })
  return JSON.parse(JSON.stringify(user));
}