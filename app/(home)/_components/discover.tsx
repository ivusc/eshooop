import { Button } from '@/components/ui/button'
import { Globe } from '@/components/ui/globe'
import { landingPageData } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

export default function Discover() {
  return (
    <section id='about' className='mx-48 space-y-6 my-12 flex items-center h-[60vh]'>
      <div className='grid grid-cols-12'>
        <div className="col-span-6 space-y-6">
          <h1 className='text-start font-bold text-3xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent w-fit'>{landingPageData.discover.title}</h1>
          <div className='text-pretty' dangerouslySetInnerHTML={{ __html: landingPageData.discover.description }} />
          <Link href='/products'>
            <Button>Discover</Button>
          </Link>
        </div>
        <div className="col-span-6 bg-background relative flex">
          <Globe className='-top-32'/>
        </div>
      </div>
    </section>
  )
}
