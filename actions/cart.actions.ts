"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Cart, { ICartItem } from "@/models/Cart";
import Product from "@/models/Product";

/** 📦 Get Cart */
export async function getCart(userId: string) {
  await connectToDatabase();
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  return JSON.parse(JSON.stringify(cart));
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  await connectToDatabase();

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  }

  //check if item is already in cart
  const itemIndex = cart.items.findIndex(
    (item:ICartItem) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  // Recalculate total price
  cart.totalPrice = await calculateCartTotal(cart.items);
  await cart.save();

  return JSON.parse(JSON.stringify(cart));
}

export async function removeFromCart(userId: string, productId: string, quantity = 1) {
  await connectToDatabase();

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const itemIndex = cart.items.findIndex(
    (item: ICartItem) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    throw new Error("Product not found in cart");
  }

  // Remove the item
  cart.items.splice(itemIndex, 1);

  // Recalculate total price
  cart.totalPrice = await calculateCartTotal(cart.items);

  await cart.save();
  return JSON.parse(JSON.stringify(cart));
}

/** 🧮 Helper to recalc total */
async function calculateCartTotal(items: ICartItem[]) {
  const products = await Promise.all(
    items.map((item) => Product.findById(item.product))
  );

  return products.reduce((sum, product, idx) => {
    if (!product) return sum;
    return sum + product.price * items[idx].quantity;
  }, 0);
}
