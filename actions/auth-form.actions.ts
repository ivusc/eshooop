"use server"

import { redirect } from "next/navigation";
import { z } from 'zod';
import { loginUser, registerUser } from "./auth.actions";
import { PasswordResetToken } from "@/models/ResetToken";
import crypto from 'crypto';
import User from "@/models/User";
import { cookies } from "next/headers";
import { sendResetEmail } from "@/lib/mailer";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { toast } from "sonner";

export type LoginErrors = {
  errors?: { email?: string[], password?: string[] };
  success: boolean;
}

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export async function handleLogin(prevState: LoginErrors | undefined,formData: FormData) : Promise<LoginErrors | undefined> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (parsed.success) {
    const res = await loginUser(parsed.data.email, parsed.data.password);
    if (res.success) redirect('/');
    return { success: false, errors: { password: [res.message!] } }
  } else {
    console.log(parsed.error)
    return { success: false, errors: z.flattenError(parsed.error).fieldErrors }
  }
}

export type RegisterErrors = {
  errors?: { name?: string[], email?: string[], password?: string[], cfmPassword?: string[] };
  success: boolean;
}

const registerSchema = z.object({
  name: z.string().min(5, { message: 'Name must be at least 5 characters' }),
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  cfmPassword: z.string().min(6, { message: 'Confirm Password must be at least 6 characters' }),
});


export async function handleRegister(prevState: RegisterErrors,formData: FormData): Promise<RegisterErrors> {
    const parsed = registerSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      cfmPassword: formData.get('confirmPassword'),
    })

    console.log(parsed.data?.name,parsed.data?.email,parsed.data?.password, parsed.data?.cfmPassword);

    if (parsed.data?.cfmPassword !== parsed.data?.password){
      return { success: false, errors: { password: ['Password and Confirm Password do not match'] } }
    }

    if (parsed.success) {
      await registerUser(parsed.data.name, parsed.data.email, parsed.data.password);
      redirect('/')
    }

    console.log(parsed.error)
    return { success: false, errors: z.flattenError(parsed.error).fieldErrors }
  }

export async function forgotPassword(email: string) {
  const user = await User.findOne({ email })
  if (!user) {
    return { message: "If this email exists, a link has been sent." };
  }
  console.log(user)

  // generate a token
  const token = crypto.randomBytes(32).toString("hex");
  console.log(token)

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