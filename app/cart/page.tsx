import { getCart } from "@/actions/cart.actions";
import { getSession } from "@/actions/auth.actions";
import { getUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
import { ICart, ICartItem } from "@/models/Cart";
import CheckoutButton from "./_components/checkout-button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/app/cart/_components/cart-item";
import { IUser } from "@/models/User";

export default async function CartPage() {
  const session = await getSession();
  const user : IUser = await getUser(session.email);

  if (!user) redirect('/');

  const cart : ICart = await getCart(user._id.toString());

  if (!cart || cart.items.length === 0)
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-500">🛒 Your cart is empty</p>
      </main>
    );

  return(
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.items.map((item: ICartItem) => (
        <CartItem key={item.product._id.toString()} userId={cart.user.toString()} item={item} />
      ))}

      <Card className="p-4 px-12 mt-6 flex flex-row justify-between items-center bg-background">
        <p className="font-semibold text-lg">Total</p>
        <p className="font-semibold text-lg">${cart.totalPrice.toFixed(2)}</p>
      </Card>

      <CheckoutButton userId={user._id.toString()}/>
    </main>
  )
}


