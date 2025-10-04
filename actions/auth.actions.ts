"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { decrypt, encrypt } from "@/lib/utils";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  await connectToDatabase();
  console.log(name, email, password);

  //find existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, message: 'User already exists' }
  }

  //add new user to db
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  console.log(user);

  //create session
  const session = await encrypt({ email: user.email, name: user.name });

  // Save the session in a cookie
  (await cookies()).set("session", session, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7
  });

  return JSON.parse(JSON.stringify(user));
}

export async function loginUser(email: string, password: string) {
  await connectToDatabase();

  //find user and validate
  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: 'Invalid User' }
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: 'Invalid username or password.'}
  }

  //create the session
  const session = await encrypt({ email: user.email, name: user.name });

  //save the session in a cookie
  (await cookies()).set("session", session, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7
  });

  return { success: true, user: JSON.parse(JSON.stringify(user))}
}

export async function logout() {
  //delete the cookie
  (await cookies()).set("session", "", { maxAge: 0 });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.maxAge = new Date(Date.now() + 60 * 60 * 24 * 7);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    maxAge: parsed.expires,
  });
  return res;
}
