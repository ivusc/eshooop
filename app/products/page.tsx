import { getSession } from '@/actions/auth.actions';
import { getProducts } from '@/actions/product.action';
import { getUser } from '@/actions/user.actions';
import ProductsPage from '@/components/product/products-page';
import { IProduct } from '@/models/Product';
import { IUser } from '@/models/User';
import React from 'react'

export default async function ProductsPageWrapper() {
  const session = await getSession();
  const products : IProduct[] = await getProducts();

  const user : IUser  = await getUser(session?.email);;

  return (
    <main className="xl:mx-16">
      <ProductsPage initialProducts={products} user={user} />
    </main>
  )
}
