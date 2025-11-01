import { Hero } from "./_components/hero";
import About from "./_components/about";
import USP from "./_components/usp";
import TestimonialMarquee from "./_components/testimonial";

export default async function Home() {
  return (
    <div className="w-full">
      <Hero/>
      <About/>
      <USP/>
      <TestimonialMarquee />
    </div>
  );
}
