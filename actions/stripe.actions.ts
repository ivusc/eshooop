"use server";

import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Cart, { ICart, ICartItem } from "@/models/Cart";
import { IProduct } from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-09-30.clover",
});

/**
 * Create a Stripe Checkout session from a user's cart.
 * Returns { url } where the client should redirect the browser.
 */

export async function createCheckoutSessionForCart(userId: string) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY env variable");
  }

  await connectToDatabase();

  // Load cart and products
  const cart : ICart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || !cart.items || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Build line items
  const line_items = cart.items.map((item: ICartItem) => {
    const product = item.product as IProduct;
    const unit_amount = Math.round((product.price ?? 0) * 100); // cents
    return {
      price_data: {
        currency: "usd", // change if needed
        product_data: {
          name: product.name,
          description: product.description ?? undefined,
          // optional: add images if Stripe needs them
          images: product.pictures?.length ? [product.pictures[0]] : undefined,
        },
        unit_amount,
      },
      quantity: item.quantity,
    };
  });

  // Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items : line_items,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    // optional: pass cart id or user id in metadata
    metadata: {
      cartId: cart._id?.toString() || '',
      userId: cart.user.toString(),
    }
  });

  return { url: session.url };
}
