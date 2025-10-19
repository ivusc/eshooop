'use client'
import React, { useState } from 'react'
import Searchbar from '../shared/searchbar'
import { IProduct } from '@/models/Product'
import { IUser } from '@/models/User';
import ProductCard from './product-card';
import { useRouter } from 'next/navigation';

export default function ProductsPage({ initialProducts, user } : { initialProducts: IProduct[], user: IUser }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);

  const handleSearch = (query: string) => {
    console.log(query,13)
    if (!query) return setProducts(initialProducts);
    const lower = query.toLowerCase();
    console.log(lower)
    setProducts(products => products.filter((p) => p.name.toLowerCase().includes(lower)));
    router.refresh();
  }

  return (
    <div>
      <Searchbar placeholder='Search for products...' onSearch={handleSearch} />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.length > 0 ? 
          products.map((product: IProduct) => (
            <ProductCard product={product} user={user} key={product._id.toString()} />
          )) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  )
}
