import React from 'react'
import { Rating as StarRating, RatingButton } from '../ui/shadcn-io/rating'

export default function Rating() {
  return (
    <div className="flex flex-col gap-1">
      <StarRating defaultValue={4}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton key={index} size={14} />
        ))}
      </StarRating>
    </div>
  )
}
