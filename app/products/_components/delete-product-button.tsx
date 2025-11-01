'use client'
import { deleteProduct } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/models/Product';
import { IUser } from '@/models/User';
import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { FormEvent } from 'react'
import { toast } from 'sonner';

export default function DeleteProductButton({ user, product } : { user: IUser | null, product: IProduct }) {
  
  async function handleDeleteProduct(e:FormEvent) {
    e.preventDefault()
    const res = await deleteProduct(product._id.toString());
    if(!user) redirect('/login');
    
    if (res.success) {
      toast.success(`Product added to cart.`);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <form onSubmit={handleDeleteProduct} className='w-fit'>
      <Button variant='destructive' className='rounded-md cursor-pointer'>
        <Trash2 />
      </Button>
    </form>
  )
}
