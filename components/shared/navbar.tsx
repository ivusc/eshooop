import { getSession } from '@/actions/auth.actions'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { navLinks } from '@/lib/constants'
import LogoutForm from '../forms/auth/logout-form'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'
import { getUser } from '@/actions/user.actions'
import { getTotalItemsInCart } from '@/actions/cart.actions'


export default async function Navbar() {
  const session = await getSession()
  let user;
  if (session) user = await getUser(session?.email);

  let cartItemsTotal;
  if (user) cartItemsTotal = await getTotalItemsInCart(user._id);

  return (
    <nav className="flex flex-row justify-between items-center md:px-12 px-4 bg-opacity-50 py-4 top-0 sticky backdrop-blur-lg h-[10vh] z-20 w-full">
      <Link href="/" className='flex flex-row justify-center items-center space-x-4'>
        <p className="font-bold text-lg">eShooop</p>
      </Link>
      <div className='hidden md:flex flex-row items-center space-x-4'>
        <NavigationMenu>
          <NavigationMenuList>
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.label}>
              <Link href={link.link}>
                {link.sublinks ? <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger> : 
                  <p className='px-4 py-2 hover:bg-accent rounded-lg text-sm'>{link.label}</p>
                }
              </Link>
              <NavigationMenuContent className='md:w-[200px]'>
              {link.sublinks && link.sublinks.map((sublink) => (
                <NavigationMenuLink href={sublink.link} key={sublink.label}>
                  <p className='px-4 py-2'>{sublink.label}</p>
                </NavigationMenuLink>
              ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          </NavigationMenuList>
        </NavigationMenu>

        {session !== null ? (
          <>
            <Link href='/cart' className='flex flex-row items-center justify-center space-x-4 hover:bg-accent rounded-md px-4 py-2'>
              <p className='font-medium'>Cart 🛒 ({cartItemsTotal?.toString()})</p>
            </Link>
            <div className='flex flex-row justify-between items-center space-x-4 hover:bg-accent p-2 rounded-md cursor-pointer'>
              <Link href='/profile' className='flex flex-row'>
                <User />
                <p>{session.username}</p>
              </Link>
            </div>
            <LogoutForm />
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
