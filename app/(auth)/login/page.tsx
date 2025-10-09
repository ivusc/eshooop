import { getSession } from '@/actions/auth.actions';
import LoginForm from '@/components/forms/auth/login-form';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function LoginPage() {
  const session = await getSession()

  if (session !== null) redirect('/');
  
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md  rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}
