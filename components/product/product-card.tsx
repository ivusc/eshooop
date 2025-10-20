import { IProduct } from '@/models/Product'
import { IUser } from '@/models/User'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import Rating from './product-rating'
import { deleteProduct } from '@/actions/product.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
// import { revalidatePath } from 'next/cache'

export default function ProductCard({ product, user } : { product: IProduct, user: IUser }) {
  return (
    <div
      key={product._id.toString()}
      className="flex flex-col rounded-lg overflow-hidden hover:bg-accent cursor-pointer p-2 transition"
    >
      <Link href={`/products/${product._id}`}>
        {product.pictures?.[0] && (
          <div className="relative w-full h-48 p-2">
            <Image
              src={product.pictures[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-400 text-sm mb-2">{product.category}</p>
          <Rating />
          <p className="font-bold py-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="flex space-x-1">
        {user?.role == 'Buyer' && product.stock > 0 &&
        <Button className="w-full py-2 px-4 rounded-md cursor-pointer">
          Add to Cart
        </Button>}
        {user?.role == 'Seller' && 
          <div className='flex space-x-1 p-2'>
            <Button className=" py-2 px-4 rounded-md cursor-pointer">
              Add to Cart
            </Button>
            <Link href={`/products/edit/${product._id.toString()}`} className='w-fit'>
              <Button className='bg-emerald-600 hover:bg-emerald-700 text-white rounded-md cursor-pointer'>
                <Pencil />
              </Button>
            </Link>
            <DeleteButton productId={product._id.toString()} />
          </div>
        }
      </div>
    </div>
  )
}


function DeleteButton ({ productId } : { productId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await deleteProduct(productId);

    if (res.success) {
      toast.success(`Product deleted successfully.`);
    } else {
      toast.error('Error deleting');
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleDelete} className='w-fit'>
      <Button variant={'destructive'} className='text-white rounded-md cursor-pointer'>
        <Trash2 />
      </Button>
    </form>
  )
}