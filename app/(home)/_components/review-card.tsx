import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'


interface IReview {
  name: string,
  comment: string,
  rating: number
}

export default function ReviewCard({ review }: { review: IReview }) {
  return (
    <Card className="w-[280px] sm:w-80 border-none hover:bg-muted transition-all duration-300">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-base sm:text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
              ★
            </span>
          ))}
        </div>
        <p className="text-sm sm:text-base text-gray-200 mb-3 sm:mb-4 line-clamp-3">&quot;{review.comment}&quot;</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold flex-shrink-0">
            {review.name.charAt(0)}
          </Avatar>
          <div className="min-w-0">
            <p className="font-semibold text-sm sm:text-base text-gray-100 truncate">{review.name}</p>
            <p className="text-xs sm:text-sm text-gray-400">Verified Buyer</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
