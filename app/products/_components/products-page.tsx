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
    <div className='w-full space-y-4'>
      <Searchbar placeholder='Search for products...' onSearch={handleSearch} />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product: IProduct) => (
          <ProductCard product={product} user={user} key={product._id.toString()} />
        ))}
      </div>
    </div>
  )
}
