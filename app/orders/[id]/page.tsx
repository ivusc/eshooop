import { getSession } from '@/actions/auth.actions';
import { getOrder } from '@/actions/order.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ISession } from '@/lib/types';
import { IOrderItem } from '@/models/Order';
import { IProduct } from '@/models/Product';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Page({ params } : { params: { id: string }}) {
  const { id } = await params;
  const session : ISession = await getSession();
  if (!session.id) redirect('/login');

  const order = await getOrder(session.id, id);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 sm:space-y-12 min-h-[70vh]">
      <Link
        href="/profile"
        className="text-xs sm:text-sm text-muted-foreground hover:underline inline-block"
      >
        ← Back to Orders
      </Link>

      <Card className="shadow-lg border-none bg-background">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">
            Order #{String(order._id).slice(-6).toUpperCase()}
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Status</p>
              <p
                className={`font-medium text-sm sm:text-base ${
                  order.status === "paid"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status.toUpperCase()}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">Items</p>
              <ul className="space-y-3">
                {order.items.map((item: IOrderItem, i: number) => (
                  <li
                    key={i}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <div>
                      <p className="font-medium text-sm sm:text-base">{(item.product as IProduct).name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-sm sm:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-base sm:text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
