import { getSession } from "@/actions/auth.actions";
import RegisterForm from "@/components/forms/auth/register-form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getSession();

  if (session !== null) redirect('/');

  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        <RegisterForm />
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
