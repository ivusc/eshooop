"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IReview } from "@/models/Review";
import React, { useState } from "react";
import EditReviewForm from "./edit-review-form";
import ReviewCard from "./review-card";

export default function ReviewList({
  reviews,
  userId,
}: {
  reviews: IReview[];
  userId?: string;
}) {
  const [openEditDialogId, setOpenEditDialogId] = useState<string | null>(null);

  const handleOpenEditDialog = (id: string) => {
    setOpenEditDialogId(id);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialogId(null);
  };

  const selectedReview = reviews.find(
    (r) => r._id.toString() === openEditDialogId
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-sm sm:text-base text-muted-foreground">
          No reviews yet.
        </p>
      ) : (
        reviews.map((review) => (
          <div key={review._id.toString()}>
            <ReviewCard
              review={review}
              userId={userId}
              onEditClick={handleOpenEditDialog}
              onDeleteClick={handleOpenEditDialog}
            />
            {openEditDialogId === review._id.toString() && userId && selectedReview && (
              <Dialog open={true} onOpenChange={handleCloseEditDialog}>
                <DialogContent className="!max-w-4xl">
                  <DialogTitle className="m-4">Edit Review</DialogTitle>
                  <EditReviewForm
                    onCloseDialog={handleCloseEditDialog}
                    review={selectedReview}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        ))
      )}
    </div>
  );
}