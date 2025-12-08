import React from 'react'
import { landingPageData } from '@/lib/constants'
import aboutImage from '@/public/images/about.svg'
import Image from 'next/image'

export default function About() {
  return (
    <section id='about' className='px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 space-y-6 my-12 flex items-center min-h-[60vh]'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 w-full'>
        <div className="col-span-1 md:col-span-6 flex justify-center md:justify-start">
          <Image src={aboutImage} width={400} height={400} className='rounded-xl overflow-hidden select-none pointer-events-none w-full max-w-[400px] h-auto' alt='about image'/>
        </div>
        <div className="col-span-1 md:col-span-6 space-y-6 flex flex-col justify-center">
          <h1 className='text-start font-bold text-2xl sm:text-3xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent w-fit'>{landingPageData.about.title}</h1>
          <div className='text-pretty text-sm sm:text-base' dangerouslySetInnerHTML={{ __html: landingPageData.about.description }} />
        </div>
      </div>
    </section>
  )
}
