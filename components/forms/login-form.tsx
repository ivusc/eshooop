'use client'
import { handleLogin } from '@/actions/auth-form.actions';
import Link from 'next/link';
import React, { useActionState } from 'react'
import { Button } from '../ui/button';

export default function LoginForm() {
  const [state, formAction] = useActionState(handleLogin, { success: false });
  console.log(state)
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {state?.errors?.email && <p style={{ color: 'red' }}>{state.errors.email}</p>}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {state?.errors?.password && <p style={{ color: 'red' }}>{state.errors.password}</p>}
        <Link href='/forgot-password'>
          <p className='text-xs my-2 hover:text-blue-600 hover:underline'>Forgot password?</p>
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign In
      </Button>
    </form>
  )
}
