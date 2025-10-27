import { Card, CardContent } from '@/components/ui/card'
import { IReview } from '@/models/Review'
import { IUser } from '@/models/User'
import { Star } from 'lucide-react'
import React from 'react'

export default function ReviewList({ reviews } : { reviews : IReview[] }) {
  return (
    <div className="space-y-4">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <Card key={r._id.toString()} className='w-4xl'>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{(r.user as IUser).username || "Anonymous"}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-sm">{r.comment}</p>}
                <p className="text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
  )
}
