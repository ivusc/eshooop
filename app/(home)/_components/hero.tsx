"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/public/images/hero.svg"

export function Hero() {
  return (
    <HeroHighlight className="space-y-4">
      <div className="justify-center flex items-center">
        <Image src={heroImage} width={400} height={200} alt='hero image' className="select-none pointer-events-none"/>
      </div>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-lg sm:text-2xl md:text-3xl px-4 font-semibold text-neutral-700 dark:text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Discover millions of products from trusted sellers worldwide.<br/>
        Get the best deals, fastest shipping and premium quality
        all in one place.
      </motion.h1>
      <motion.div 
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: [-20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="flex items-center justify-center pt-4">
        <Link href='/products'>
          <Button size={'lg'}>Products</Button>
        </Link>
      </motion.div>
    </HeroHighlight>
  );
}
