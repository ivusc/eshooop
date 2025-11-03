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
    <div className="max-w-3xl mx-auto p-6 space-y-12">
      <Link
        href="/profile"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to Orders
      </Link>

      <Card className="shadow-lg border border-border/40 bg-background">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Order #{String(order._id).slice(-6).toUpperCase()}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p
                className={`font-medium ${
                  order.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-3">Items</p>
              <ul className="space-y-3">
                {order.items.map((item: IOrderItem, i: number) => (
                  <li
                    key={i}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{(item.product as IProduct).name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
