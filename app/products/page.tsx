import { getProducts } from '@/actions/product.action';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-8 mx-72">
      <Input placeholder='Search for products...' className='mb-4'/>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <div
            key={product._id}
            className=" rounded-lg overflow-hidden hover:bg-accent cursor-pointer transition"
          >
            {product.pictures?.[0] && (
              <div className="relative w-full h-48">
                <Image
                  src={product.pictures[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <Link href={`/products/${product._id}`}>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                <p className="font-bold mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-accent-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
