import { getSession } from '@/actions/auth.actions';
import { getOrdersByUser } from '@/actions/order.actions';
import { ISession } from '@/lib/types';
import { IOrder, IOrderItem } from '@/models/Order';
import { IProduct } from '@/models/Product';
import Link from 'next/link';
import React from 'react'

export default async function Page() {
  const session : ISession = await getSession();
  const orders = await getOrdersByUser(session.id);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order: IOrder) => (
            <li key={order._id.toString()} className="border p-4 rounded-xl shadow-sm">
              <Link
                href={`/orders/${order._id.toString()}`}
                className="block hover:bg-muted/30 transition rounded-lg p-2"
              >
              <h2 className="font-medium mb-2">Order #{order._id.toString().slice(-6).toUpperCase()}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="space-y-2">
                {order.items.map((item: IOrderItem) => (
                  <li key={item.product._id.toString()} className="flex justify-between">
                    <span>
                      {(item.product as IProduct).name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-semibold">
                Total: ${order.total.toFixed(2)}
              </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
