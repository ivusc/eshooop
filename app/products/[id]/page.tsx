import { getSession } from '@/actions/auth.actions';
import { addToCart } from '@/actions/cart.actions';
import { getProduct } from '@/actions/product.action';
import { getUser } from '@/actions/user.actions';
import { Button } from '@/components/ui/button';
import { IUser } from '@/models/User';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function ProductPage({ params } : { params: { id: string }}) {
  const { id } = await params;
  const product = await getProduct(id);
  const session = await getSession();
  let user : IUser | null = null;
  if (session) user = await getUser(session?.email);

  async function handleAdd() {
    "use server"
    if(!user) redirect('/login');
    await addToCart(user._id.toString(), product._id, 1);
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
          {product.pictures?.[0] && (
            <Image
              src={product.pictures[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6">{product.description}</p>

          <div className="flex items-center gap-4">
            <form action={handleAdd}>
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Add to Cart
              </Button>
            </form>
            <span className="text-gray-500">Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
