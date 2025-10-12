import { getSession } from '@/actions/auth.actions';
import { deleteProduct, getProducts } from '@/actions/product.action';
import { getUser } from '@/actions/user.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IProduct } from '@/models/Product';
import { IUser } from '@/models/User';
import { Pencil, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ProductsPage() {
  const session = await getSession();
  const products = await getProducts();

  let user : IUser;
  if (session) user = await getUser(session?.email);

  return (
    <main className="xl:mx-16">
      <Input placeholder='Search for products...' className='mb-4'/>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product: IProduct) => (
          <div
            key={product._id.toString()}
            className=" rounded-lg overflow-hidden hover:bg-accent cursor-pointer transition"
          >
            <Link href={`/products/${product._id}`}>
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
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                <p className="font-bold mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-accent-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
            <div className="flex space-x-1 p-4">
              {user?.role == 'Buyer' && 
              <Button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">
                Add to Cart
              </Button>}
              {user?.role == 'Seller' && 
                <div className='flex space-x-1 p-4'>
                  <Button className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">
                    Add to Cart
                  </Button>
                  <Link href={`/products/edit/${product._id.toString()}`} className='w-fit'>
                    <Button className=' bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer'>
                      <Pencil />
                    </Button>
                  </Link>
                  <DeleteButton productId={product._id.toString()} />
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

async function DeleteButton ({ productId } : { productId: string }) {
  async function handleDelete() {
    "use server";
    await deleteProduct(productId);
    revalidatePath("/products");
  }

  return (
    <form action={handleDelete} className='w-fit'>
      <Button className=' bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer'>
        <Trash2 />
      </Button>
    </form>
  )
}