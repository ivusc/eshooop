import React from 'react'
import { landingPageData } from '@/lib/constants'
import aboutImage from '@/public/images/about.png'
import Image from 'next/image'

export default function About() {
  return (
    <section id='about' className='mx-48 space-y-6 my-12 flex items-center h-[60vh]'>
      <div className='grid grid-cols-12'>
        <div className="col-span-6">
          <Image src={aboutImage} width={400} height={400} className='rounded-xl overflow-hidden select-none pointer-events-none' alt='about image'/>
        </div>
        <div className="col-span-6 space-y-6">
          <h1 className='text-start font-bold text-3xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent w-fit'>{landingPageData.about.title}</h1>
          <div className='text-pretty' dangerouslySetInnerHTML={{ __html: landingPageData.about.description }} />
        </div>
      </div>
    </section>
  )
}
