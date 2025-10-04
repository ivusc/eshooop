import { getSession, logout } from '@/actions/auth.actions'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { navLinks } from '@/lib/constants'
import { redirect } from 'next/navigation'


export default async function Navbar() {
  const session = await getSession()

  return (
    <nav className="flex flex-row justify-between items-center md:px-12 px-4 bg-opacity-50 py-4 top-0 sticky backdrop-blur-lg h-[10vh] z-20 w-full">
      <Link href="/" className='flex flex-row justify-center items-center space-x-4'>
        <p className="font-bold text-lg">eShooop</p>
      </Link>
      <div className='hidden md:flex flex-row items-center space-x-4'>
        {navLinks.map((link) => (
          <Link href={link.link} scroll={false} key={link.label} className='flex flex-row items-center justify-center space-x-4 dark:hover:bg-primary/50 rounded-md p-2 '>
            <p className='font-bold'>{link.label}</p>
          </Link>
        ))}
        {session !== null ? (
          <>
            <div className='flex flex-row justify-between items-center space-x-4 hover:bg-accent p-2 rounded-md cursor-pointer'>
              <Link href='/profile' className='flex flex-row'>
                <User />
                <p>{session.name}</p>
              </Link>
            </div>
            <form action={async()=>{
              "use server";
              await logout();
              redirect("/");
            }}>
              <Button>Logout</Button>
            </form>
          </>
          ) : (
            <Link href='/login'>
              <Button>Login</Button>
            </Link>
          )
        }
      </div>
    </nav>
  )
}
