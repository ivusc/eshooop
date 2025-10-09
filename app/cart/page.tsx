import { getCart, addToCart, removeFromCart } from "@/actions/cart.actions";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSession } from "@/actions/auth.actions";
import { getUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
import { ICart, ICartItem } from "@/models/Cart";
import Image from "next/image";

export default async function CartPage() {
  const session = await getSession();
  const user = await getUser(session.email);

  if (!user) redirect('/');

  const cart : ICart = await getCart(user._id);

  console.log(typeof cart.items[0])

  if (!cart || cart.items.length === 0)
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-500">🛒 Your cart is empty</p>
      </main>
    );

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.items.map((item: ICartItem) => (
        <CartItem key={item.product._id.toString()} userId={cart.user.toString()} item={item} />
      ))}

      <Card className="p-4 px-12 mt-6 flex flex-row justify-between items-center">
        <p className="font-semibold text-lg">Total</p>
        <p className="font-semibold text-lg">${cart.totalPrice.toFixed(2)}</p>
      </Card>
      
      <div className="flex flex-row justify-center items-center">
        <Button className="items-center justify-center">Checkout</Button>
      </div>
    </main>
  );
}

async function CartItem({ userId, item }: { userId: string; item: ICartItem }) {
  async function handleRemove() {
    "use server";
    await removeFromCart(userId, item.product._id.toString());
    revalidatePath("/cart");
  }

  async function handleAdd() {
    "use server";
    await addToCart(userId, item.product._id.toString(), 1);
    revalidatePath("/cart");
  }

  return (
    <Card className="flex flex-row items-center justify-between p-4 px-12 shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          width={128}
          height={128}
          src={item.product.pictures?.[0] || "/placeholder.png"}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h2 className="font-semibold">{item.product.name}</h2>
          <p className="text-sm text-gray-500">${item.product.price}</p>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <form action={handleAdd}>
          <Button type="submit" size="sm" variant="outline">
            +
          </Button>
        </form>
        <form action={handleRemove}>
          <Button type="submit" size="sm" variant="destructive">
            -
          </Button>
        </form>
      </div>
    </Card>
  );
}
