"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/actions/auth-form.actions";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return setMessage("Invalid reset link");
    const res = await resetPassword(token, password);
    setMessage(res.message);
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-semibold">Reset Password</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
        Reset
      </Button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
