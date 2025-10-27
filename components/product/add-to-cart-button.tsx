'use client'
import { addToCart } from '@/actions/cart.actions';
import { Button } from '@/components/ui/button'
import { IProduct } from '@/models/Product';
import { IUser } from '@/models/User';
import { ShoppingBasket } from 'lucide-react'
import { redirect } from 'next/navigation';
import React, { FormEvent } from 'react'
import { toast } from 'sonner';

export default function AddToCartButton({ user, product } : { user: IUser | null, product: IProduct }) {

  async function handleAddToCart(e:FormEvent) {
    e.preventDefault();
    console.log('add')
    if(!user) redirect('/login');

    const res = await addToCart(user._id.toString(), product._id.toString(), 1);
    // console.log(res)
    if (res.success) {
      toast.success(`Product added to cart.`);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <form onSubmit={handleAddToCart}>
      <Button className=" px-6 py-2 rounded-lg cursor-pointer">
        Add to Cart
        <ShoppingBasket />
      </Button>
    </form>
  )
}
