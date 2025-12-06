'use client'
import React, { useState } from 'react'
import Searchbar from '@/components/shared/searchbar'
import { IProduct } from '@/models/Product'
import { IUser } from '@/models/User';
import ProductCard from './product-card';

export default function ProductsPage({ initialProducts, user } : { initialProducts: IProduct[], user: IUser }) {
  const [products, setProducts] = useState(initialProducts);

  const handleSearch = (query: string) => {
    if (!query) return setProducts(initialProducts);
    const lower = query.toLowerCase();
    setProducts(initialProducts.filter((p) => p.name.toLowerCase().includes(lower)));
  }

  return (
    <div className='space-y-4 my-8 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48'>
      <Searchbar placeholder='Search for products...' onSearch={handleSearch} />
      <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product: IProduct) => (
          <ProductCard product={product} user={user} key={product._id.toString()} />
        ))}
      </div>
    </div>
  )
}
