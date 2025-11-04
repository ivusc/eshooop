import React from 'react'
import EditProfileForm from './edit-profile-form'
import { getUser } from '@/actions/user.actions';
import { IUser } from '@/models/User';
import { getSession } from '@/actions/auth.actions';

export default async function ProfileEditPage() {
  const session = await getSession();
  const user : IUser = await getUser(session.email);

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold my-12'>Edit Profile</h1>
      <EditProfileForm user={user} />
    </main>
  )
}
