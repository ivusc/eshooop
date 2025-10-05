'use client'
import React from 'react'
import { Button } from '../ui/button';
import { logout } from '@/actions/auth.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LogoutForm() {
  const router = useRouter();

  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    // console.log('logout')
    await logout();
    router.refresh();
    toast.success('Logged out successfully.');
  }

  return (
    <form onSubmit={onSubmit}>
      <Button type='submit'>Logout</Button>
    </form>
  )
}
