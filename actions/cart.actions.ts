"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Cart, { ICart, ICartItem } from "@/models/Cart";
import Product, { IProduct } from "@/models/Product";
import mongoose from "mongoose";

/** 📦 Get Cart */
export async function getCart(userId: string) {
  await connectToDatabase();
  const cart : ICart = await Cart.findOne({ user: userId }).populate("items.product");
  return JSON.parse(JSON.stringify(cart));
}

export async function getTotalItemsInCart(userId: string) {
  await connectToDatabase();
  const cart : ICart | null  = await Cart.findOne({ user: userId })
  
  if (!cart) if (!cart) return { success: false, message: 'Cart not found.' }

  return cart.items.length;
}

/** 🛒 Add to Cart */
export async function addToCart(userId: string, productId: string, quantity = 1) {
  await connectToDatabase();

  const product : IProduct | null = await Product.findById(productId);
  if (!product) return { success: false, message: 'Product not found.'}

  let cart : ICart | null = await Cart.findOne({ user: userId });
  
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  }

  //check if item is already in cart
  const itemIndex = cart!.items.findIndex(
    (item:ICartItem) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart!.items[itemIndex].quantity += quantity;
  } else {
    cart!.items.push({ product: new mongoose.Types.ObjectId(productId), quantity });
  }

  // Recalculate total price
  cart!.totalPrice = await calculateCartTotal(cart!.items);
  await cart!.save();

  return JSON.parse(JSON.stringify(cart));
}

export async function removeFromCart(userId: string, productId: string, quantity = 1) {
  await connectToDatabase();

  const cart : ICart | null = await Cart.findOne({ user: userId });
  if (!cart) return { success: false, message: 'Cart not found.' }

  const itemIndex = cart.items.findIndex(
    (item: ICartItem) => item.product.toString() === productId
  );

  if (itemIndex === -1) return { success: false, message: "Product not found in cart"}

  // ✅ Decrease quantity or remove if it hits 0
  const item : ICartItem = cart.items[itemIndex];
  if (item.quantity > quantity){
    item.quantity -= quantity
  } else {
    cart.items.splice(itemIndex, 1);
  }

  // 🧮 Recalculate total
  cart.totalPrice = await calculateCartTotal(cart.items);

  await cart.save();
  return JSON.parse(JSON.stringify(cart));
}

/** 🧮 Calculate Total function */
async function calculateCartTotal(items: ICartItem[]) {
  const products = await Promise.all(
    items.map((item) => Product.findById(item.product))
  );

  return products.reduce((sum, product, idx) => {
    if (!product) return sum;
    return sum + product.price * items[idx].quantity;
  }, 0);
}
