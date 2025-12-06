"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <HeroHighlight>
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
        className="text-xl sm:text-2xl md:text-3xl px-4 font-bold text-neutral-700 dark:text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Discover millions of products from trusted sellers worldwide.<br/>
        Get the
        <Highlight className="text-black dark:text-white">best deals</Highlight>,&nbsp;
        <Highlight className="text-black dark:text-white">fastest shipping</Highlight>,&nbsp;and<br/>&nbsp;
        <Highlight className="text-black dark:text-white">premium quality</Highlight><br/>
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
