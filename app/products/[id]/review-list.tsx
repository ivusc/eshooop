import { Card, CardContent } from '@/components/ui/card'
import { IReview } from '@/models/Review'
import { IUser } from '@/models/User'
import { Star } from 'lucide-react'
import React from 'react'

export default function ReviewList({ reviews } : { reviews : IReview[] }) {
  return (
    <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-sm sm:text-base text-muted-foreground">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <Card key={r._id.toString()} className='w-full border-none bg-accent/70 hover:bg-accent'>
              <CardContent className="px-4 sm:px-6 md:px-12 py-4 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                  <div className='space-x-3 sm:space-x-4 flex items-center'>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold flex-shrink-0">
                      {(r.user as IUser).username.charAt(0)}
                    </div>
                    <p className="font-medium text-sm sm:text-base">{(r.user as IUser).username || "Anonymous"}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`sm:w-4 sm:h-4 ${
                          i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-xs sm:text-sm">{r.comment}</p>}
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
