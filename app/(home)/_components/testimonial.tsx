import { landingPageData } from '@/lib/constants'
import ReviewCard from './review-card';
import { Marquee } from '@/components/ui/marquee';

export default function TestimonialMarquee() {
  const { testimonials } = landingPageData;
  const firstRow = testimonials.reviews.slice(0, 2);
  const secondRow = testimonials.reviews.slice(2, 4);

  return (
    <section className="py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          {testimonials.title}
        </h2>
        
        <div className="relative flex flex-col gap-6">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Marquee>
          
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Marquee>
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}