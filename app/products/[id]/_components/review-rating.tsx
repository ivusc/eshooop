import { Star } from "lucide-react";

interface ReviewRatingProps {
  rating: number;
}

export default function ReviewRating({ rating }: ReviewRatingProps) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`sm:w-4 sm:h-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}