"use server";

import { sendResetEmail } from "@/lib/mailer";
import { connectToDatabase } from "@/lib/mongodb";
import { decrypt, encrypt, randomBytesToHex } from "@/lib/utils";
import { PasswordResetToken } from "@/models/ResetToken";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  await connectToDatabase();
  console.log(username, email, password);

  //find existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, message: 'User already exists' }
  }

  //add new user to db
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  console.log(user);

  //create session
  const session = await encrypt({ email: user.email, username: user.username });

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
    return { success: false, message: 'Invalid email or password.'}
  }

  //create the session
  const session = await encrypt({ email: user.email, username: user.username });

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

export async function forgotPassword(email: string) {
  const user = await User.findOne({ email });
  if (!user) {
    return { message: "If this email exists, a link has been sent." };
  }
  console.log(user);

  // generate a token
  const token = randomBytesToHex(32);
  console.log(token);

  // store in session or DB
  await PasswordResetToken.create({
    token,
    userId: user._id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 min
  });

  // optional: set cookie (if you prefer session-based)
  (await cookies()).set("reset_token", token, {
    httpOnly: true,
    maxAge: 15 * 60,
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  await sendResetEmail(user.email, resetUrl);

  return { message: "Password reset link sent!" };
}

export async function resetPassword(token: string, newPassword: string) {
  await connectToDatabase();

  const reset = await PasswordResetToken.findOne({ token });
  if (!reset || reset.expiresAt < new Date()) {
    return { message: "Invalid or expired token." };
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(reset.userId, { password: hashed });

  await PasswordResetToken.deleteOne({ token });

  return { message: "Password successfully reset!" };
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
