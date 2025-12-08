import { getSession } from '@/actions/auth.actions'
import { ShoppingBag, User, Menu, X, Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../../ui/button'
import { navLinks } from '@/lib/constants'
import LogoutForm from './logout-form'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../../ui/navigation-menu'
import { getTotalItemsInCart } from '@/actions/cart.actions'
import { getTotalOrders } from '@/actions/order.actions'
import { ISession } from '@/lib/types'
import { IUser } from '@/models/User'
import { getUser } from '@/actions/user.actions'
import MobileNav from './mobile-nav'


export default async function Navbar() {
  const session : ISession = await getSession();

  let user: IUser | null = null;

  if (session) user = await getUser(session.email);

  let cartItemsTotal: number | undefined;
  let orderItemsTotal: { count: number } | undefined;
  if (session?.id) {
    const cartResult = await getTotalItemsInCart(session.id);
    cartItemsTotal = typeof cartResult === 'number' ? cartResult : undefined;
    
    const orderResult = await getTotalOrders(session.id);
    if (orderResult && 'count' in orderResult) {
      orderItemsTotal = { count: orderResult.count };
    }
  }

  return (
    <nav className="flex flex-row justify-between items-center md:px-12 px-4 bg-opacity-50 py-4 top-0 sticky backdrop-blur-lg h-[10vh] z-50 w-full">
      <Link href="/" className='flex flex-row justify-center items-center space-x-4'>
        <p className="font-bold text-lg flex"><ShoppingBag />&nbsp;eShooop</p>
      </Link>
      <div className='hidden md:flex flex-row items-center space-x-4'>
        <NavigationMenu>
          <NavigationMenuList className='bg-opacity-50 backdrop-blur-lg'>
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.label}>
              <Link href={link.link}>
                {(link.sublinks && session) ? <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger> : 
                  <p className='px-4 py-2 hover:bg-accent/20 rounded-lg text-sm'>{link.label}</p>
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
              <p className='font-medium'>Cart 🛒 ({cartItemsTotal?.toString() || 0})</p>
            </Link>
            <div className='flex flex-row justify-between items-center space-x-4 hover:bg-accent p-2 rounded-md cursor-pointer'>
              <Link href='/profile' className='flex flex-row'>
                <User />
                <p>{user?.username} ({orderItemsTotal?.count.toString() || 0})</p>
              </Link>
            </div>
            {user && user.role == 'Seller' && <div className='flex flex-row justify-between items-center space-x-4 hover:bg-accent p-2 rounded-md cursor-pointer'>
              <Link href='/admin' className='flex flex-row'>
                <Lock />
                <p>Admin</p>
              </Link>
            </div>}
            <LogoutForm />
          </>
          ) : (
            <Link href='/login'>
              <Button>Login</Button>
            </Link>
          )
        }
      </div>
      <MobileNav 
        session={session} 
        user={user} 
        cartItemsTotal={cartItemsTotal} 
        orderItemsTotal={orderItemsTotal} 
      />
    </nav>
  )
}
