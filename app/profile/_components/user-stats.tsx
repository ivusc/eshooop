import { Separator } from '@/components/ui/separator'
import React from 'react'

type TUserStats = {
  totalOrders: number,
  totalSpent: number,
  totalSaved: number,
  totalReviews: number
}

export default function UserStats({ totalOrders, totalSpent, totalSaved, totalReviews } : TUserStats) {
  return (
    <div>
      {/* Stats */}
      <Separator className="bg-zinc-900 my-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
            {totalOrders}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-1 text-center">Total Orders</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
            ${totalSpent}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-1 text-center">Total Spent</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
            {totalSaved}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-1 text-center">Saved Items</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {totalReviews}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-1 text-center">Reviews</div>
        </div>
      </div>
    </div>
  )
}
