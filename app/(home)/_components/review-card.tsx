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
    <Card className="w-80 border-none hover:bg-muted transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
              ★
            </span>
          ))}
        </div>
        <p className="text-gray-200 mb-4 line-clamp-3">&quot;{review.comment}&quot;</p>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {review.name.charAt(0)}
          </Avatar>
          <div>
            <p className="font-semibold text-gray-100">{review.name}</p>
            <p className="text-sm text-gray-400">Verified Buyer</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
