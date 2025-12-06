import { addToCart, removeFromCart } from '@/actions/cart.actions';
import { ICartItem } from '@/models/Cart';
import { IProduct } from '@/models/Product';
import React from 'react'
import { Card } from '../../../components/ui/card';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export function CartItem({ userId, item }: { userId: string; item: ICartItem }) {
  const product = item.product as IProduct;

  async function handleRemove() {
    "use server"
    await removeFromCart(userId, product._id.toString());
    revalidatePath('/cart')
  }

  async function handleAdd() {
    "use server"
    await addToCart(userId, product._id.toString(), 1);
    revalidatePath('/cart')
  }

  return (
    <Card className="flex flex-row items-center justify-between p-4 sm:px-6 md:px-12 shadow-sm border-none bg-accent/70 hover:bg-accent gap-4">
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md bg-zinc-100 flex-shrink-0">
          <Image
            width={128}
            height={128}
            src={product.pictures?.[0] || "/placeholder.png"}
            alt={product.name}
            className="p-2 object-cover rounded-md w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link className='hover:text-indigo-400' href={`/products/${product._id.toString()}`}>
            <h2 className="font-semibold text-sm sm:text-base truncate">{product.name}</h2>
          </Link>
          <p className="text-xs sm:text-sm bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text w-fit text-transparent">${product.price}</p>
          <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start">
        <form action={handleAdd}>
          <Button type="submit" size="sm" variant="outline">
            +
          </Button>
        </form>
        <form action={handleRemove}>
          <Button type="submit" size="sm" variant="destructive">
            -
          </Button>
        </form>
      </div>
    </Card>
  );
}