"use client";

import { forgotPassword } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address." })
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const res = await forgotPassword(values.email);
    toast.success(res.message);
    router.push('/')
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Form {...forgotPasswordForm}>
        <form onSubmit={forgotPasswordForm.handleSubmit(onSubmit)} className="max-w-md mx-auto mt-20 space-y-4">
          <FormField
            control={forgotPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-white">
            Send Reset Link
          </Button>
        </form>
      </Form>
    </Suspense>
  );
}
