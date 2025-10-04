'use client'
import { handleRegister } from '@/actions/auth-form.actions'
import React, { useActionState } from 'react'

export default function RegisterForm() {
  const [state, formAction] = useActionState(handleRegister, { success: false });
  console.log(state)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-white mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {state.errors?.name && <p style={{ color: 'red' }}>{state.errors.name}</p>}
      </div>

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
        {state.errors?.email && <p style={{ color: 'red' }}>{state.errors.email}</p>}
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
          placeholder="Create a password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {state.errors?.password && <p style={{ color: 'red' }}>{state.errors.password}</p>}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-white mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Re-enter your password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {state.errors?.cfmPassword && <p style={{ color: 'red' }}>{state.errors.cfmPassword}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
      >
        Sign Up
      </button>
    </form>
  )
}
