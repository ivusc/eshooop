import { getSession } from "@/actions/auth.actions";
import { getLastOrder } from "@/actions/order.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { connectToDatabase } from "@/lib/mongodb";
import { IOrder, IOrderItem } from "@/models/Order";
import { IProduct } from "@/models/Product";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function SuccessPage() {
  const session = await getSession();

  await connectToDatabase();

  const order : IOrder | null = await getLastOrder(session.id)

  if (!order)
    return (
      <div className="max-w-2xl mx-auto text-center mt-10">
        <p>No recent orders found.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 block">
          Go back home
        </Link>
      </div>
    );

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-2xl font-bold mb-4">Payment successful 🎉</h1>
        <p className="text-gray-600">Thanks for your purchase. Here is your order summary.</p>
        <Card className="shadow-lg border bg-background">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Order #{String(order._id).slice(-6).toUpperCase()}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Products</p>
                <ul className="space-y-3">
                  {order.items.map((item: IOrderItem) => (
                    <li
                      key={item.product._id.toString()}
                      className="flex justify-between items-start"
                    >
                      <div className="flex flex-col items-start">
                        <p className="font-medium text-base">{(item.product as IProduct).name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-base">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Status:</span>
                <span className="text-green-600 font-medium">PAID</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Link href='/'>
          <Button>Return Home <Home /></Button>
        </Link>
      </div>
    </main>
  );
}
