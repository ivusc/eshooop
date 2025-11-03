import React from 'react'

export default function ProductRating({ productRating, reviewCount }:{ productRating: number, reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < Math.floor(productRating) ? "text-yellow-400" : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-400">
        {productRating} <span className="text-gray-600">({reviewCount})</span>
      </span>
    </div>
  )
}
