import ProductCard from '../_components/product-card'
import { IProduct } from '@/models/Product'
import { IUser } from '@/models/User'
import React from 'react'

export default function SavedItems({ items, user } : { items: IProduct[], user: IUser }) {
  //console.log(user)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item: IProduct) => (
        <ProductCard product={item} user={user} key={item._id.toString()} />
      ))}
    </div>
  )
}
