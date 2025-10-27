import { getSession } from '@/actions/auth.actions';
import { getProduct } from '@/actions/product.action';
import { getUser } from '@/actions/user.actions';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/models/Product';
import { IUser } from '@/models/User';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import AddToCartButton from '@/components/product/add-to-cart-button';
import DeleteProductButton from '@/components/product/delete-product-button';
import ReviewList from './review-list';
import { getReviews } from '@/actions/review.actions';
import { IReview } from '@/models/Review';
import ReviewForm from './review-form';

function calculateAvgRating(reviews: IReview[]){
  return reviews.length > 0 ? (reviews.reduce((total,review) => total + review.rating,0) / reviews.length).toFixed(2) : null
}

export default async function ProductPage({ params } : { params: { id: string }}) {
  const { id } = await params;
  const product: IProduct = await getProduct(id);
  const reviews: IReview[] = await getReviews(product._id.toString());
  const avgRating = calculateAvgRating(reviews);
  const session = await getSession();
  let user : IUser | null = null;
  if (session) user = await getUser(session?.email);

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
          <p className="text-accent-foreground mb-2">{product.category}</p>
          <p className="text-2xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6">{product.description}</p>

          <div className="flex items-center gap-4">
            <AddToCartButton user={user} product={product} />
            {user?.role === 'Seller' && 
              <div className="flex space-x-4">
                <Link href={`/products/edit/${id}`}>
                  <Button className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 cursor-pointer">
                    Edit {" "}
                    <Pencil />
                  </Button>
                </Link>
                <DeleteProductButton user={user} product={product} />
              </div>
            }
            <span className="text-gray-500">Stock: {product.stock}</span>
          </div>

          {avgRating && (
            <p className="text-yellow-500 font-medium mt-4">
              ⭐ {avgRating} ({reviews.length} review{reviews.length > 1 ? "s" : ""})
            </p>
          )}
        </div>

        {user && <ReviewForm userId={user._id.toString()} productId={product._id.toString()} />}
      </div>
      <div className="mt-12">
        <ReviewList reviews={reviews} />
      </div>
    </main>
  )
}
