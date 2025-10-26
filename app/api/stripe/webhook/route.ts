/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Cart, { ICart, ICartItem } from "@/models/Cart";
import Product, { IProduct } from "@/models/Product";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-09-30.clover",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle checkout completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const cartId = session.metadata?.cartId;

    if (!userId || !cartId) {
      console.error("Missing metadata in Stripe session.");
      return NextResponse.json({ received: true });
    }

    await connectToDatabase();

    const cart : ICart = await Cart.findById(cartId).populate("items.product");
    if (!cart) {
      console.warn("Cart not found for user:", userId);
      return NextResponse.json({ received: true });
    }
    
    const orderItems = cart.items.map((item: ICartItem) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: (item.product as IProduct).price,
    }));

    const order = new Order({
      user: userId,
      items: orderItems,
      total: cart.totalPrice,
      paymentStatus: "paid",
      stripeSessionId: session.id,
    });

    await order.save();

    // ✅ 1. Update product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock = Math.max(product.stock - item.quantity, 0);
        await product.save();
      }
    }

    // ✅ 2. Clear cart after successful checkout
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    console.log(`Cart cleared and stock updated for user ${userId}`);
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false, // required for raw body
  },
};
