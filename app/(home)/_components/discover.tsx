import { Button } from '@/components/ui/button'
import { Globe } from '@/components/ui/globe'
import { landingPageData } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

export default function Discover() {
  return (
    <section id='about' className='px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 space-y-6 my-12 flex items-center min-h-[100vh] md:min-h-[60vh]'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 w-full min-h-[110vh] md:min-h-0'>
        <div className="col-span-1 md:col-span-6 space-y-6 flex flex-col justify-center order-2 md:order-1">
          <h1 className='text-start font-bold text-2xl sm:text-3xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent w-fit'>{landingPageData.discover.title}</h1>
          <div className='text-pretty text-sm sm:text-base' dangerouslySetInnerHTML={{ __html: landingPageData.discover.description }} />
          <Link href='/products'>
            <Button>Discover</Button>
          </Link>
        </div>
        <div className="col-span-1 md:col-span-6 bg-background relative flex justify-center md:justify-end order-1 md:order-2">
          <Globe className='md:-top-32 top-0'/>
        </div>
      </div>
    </section>
  )
}
