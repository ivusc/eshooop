import { addToCart, removeFromCart } from '@/actions/cart.actions';
import { ICartItem } from '@/models/Cart';
import { IProduct } from '@/models/Product';
import React from 'react'
import { Card } from '../../components/ui/card';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { revalidatePath } from 'next/cache';

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
    <Card className="flex flex-row items-center justify-between p-4 px-12 shadow-sm bg-background">
      <div className="flex items-center gap-4">
        <Image
          width={128}
          height={128}
          src={product.pictures?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h2 className="font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-500">${product.price}</p>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
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