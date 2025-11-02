import { Hero } from "./_components/hero";
import About from "./_components/about";
import USP from "./_components/usp";
import TestimonialMarquee from "./_components/testimonial";
import Discover from "./_components/discover";

export default async function Home() {
  return (
    <div className="w-full">
      <Hero/>
      <About/>
      <USP/>
      <TestimonialMarquee />
      <Discover />
    </div>
  );
}
