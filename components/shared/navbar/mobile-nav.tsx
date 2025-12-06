'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../ui/button'
import { navLinks } from '@/lib/constants'
import LogoutForm from './logout-form'
import { ISession } from '@/lib/types'
import { IUser } from '@/models/User'
import { User as UserIcon } from 'lucide-react'

export default function MobileNav({ 
  session, 
  user, 
  cartItemsTotal, 
  orderItemsTotal 
}: { 
  session: ISession | null
  user: IUser | null
  cartItemsTotal?: number
  orderItemsTotal?: { count: number }
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md hover:bg-accent/20"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-[10vh] left-0 right-0 bg-background/95 backdrop-blur-lg border-b z-50 md:hidden shadow-lg">
            <div className="flex flex-col p-4 space-y-4 max-h-[90vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link 
                    href={link.link}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 hover:bg-accent/20 rounded-lg text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                  {link.sublinks && session && (
                    <div className="ml-4 mt-2 space-y-2">
                      {link.sublinks.map((sublink) => (
                        <Link
                          key={sublink.label}
                          href={sublink.link}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 hover:bg-accent/20 rounded-lg text-sm text-muted-foreground"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {session !== null ? (
                <>
                  <Link 
                    href='/cart' 
                    onClick={() => setIsOpen(false)}
                    className='flex flex-row items-center space-x-4 hover:bg-accent/20 rounded-md px-4 py-2'
                  >
                    <p className='font-medium'>Cart 🛒 ({cartItemsTotal?.toString() || 0})</p>
                  </Link>
                  <Link 
                    href='/profile'
                    onClick={() => setIsOpen(false)}
                    className='flex flex-row items-center space-x-4 hover:bg-accent/20 p-2 rounded-md'
                  >
                    <UserIcon className="w-5 h-5" />
                    <p>{user?.username} ({orderItemsTotal?.count.toString() || 0})</p>
                  </Link>
                  <div className="pt-2">
                    <LogoutForm />
                  </div>
                </>
              ) : (
                <Link href='/login' onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

