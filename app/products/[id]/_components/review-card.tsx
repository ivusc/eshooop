import { Card, CardContent } from "@/components/ui/card";
import { IReview } from "@/models/Review";
import { IUser } from "@/models/User";
import ReviewHeader from "./review-header";
import ReviewRating from "./review-rating";
import ReviewActions from "./review-actions";

interface ReviewCardProps {
  review: IReview;
  userId?: string;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export default function ReviewCard({
  review,
  userId,
  onEditClick,
  onDeleteClick,
}: ReviewCardProps) {
  const isOwner = userId === (review.user as IUser)._id.toString();

  return (
    <Card className="w-full border-none bg-accent/70">
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <ReviewHeader user={review.user as IUser} createdAt={review.createdAt} />
          <div className="flex items-center space-x-2">
            <ReviewRating rating={review.rating} />
            {isOwner && (
              <ReviewActions
                onEdit={() => onEditClick(review._id.toString())}
                onDelete={() => onDeleteClick(review._id.toString())}
              />
            )}
          </div>
        </div>
        {review.comment && (
          <p className="text-xs sm:text-sm">{review.comment}</p>
        )}
      </CardContent>
    </Card>
  );
}