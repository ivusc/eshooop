"use client";

import { useState } from "react";
import { forgotPassword } from "@/actions/auth-form.actions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await forgotPassword(email);
    setMessage(res.message);
    redirect('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-semibold">Forgot Password</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button className="bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-white">
        Send Reset Link
      </Button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
