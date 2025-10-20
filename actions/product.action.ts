"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function getProducts(category?: string) {
  await connectToDatabase();

  if (!category) {
    const products = await Product.find().lean();
    return JSON.parse(JSON.stringify(products));
  }

  const products = await Product.find({ category })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getProduct(id: string) {
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  if (!product) return { success: false, message: "Product not found" };
  return JSON.parse(JSON.stringify(product));
}

export async function createProduct(
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  pictures: string[]
) {
  await connectToDatabase();

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    pictures,
  });
  console.log(product);

  return { success: true, message: "Product successfully created." };
}

export async function updateProduct(
  id: string,
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  pictures: string[]
) {
  await connectToDatabase();

  const product = await Product.findById(id).lean();
  if (!product) return { success: false, message: "Product not found" };

  const newProduct = await Product.findByIdAndUpdate(id, {
    name,
    description,
    price,
    category,
    stock,
    pictures,
  });
  console.log(newProduct);

  return { success: true, message: "Product successfully updated." };
}

export async function deleteProduct(id: string) {
  await connectToDatabase();

  try {
    await Product.findByIdAndDelete(id);
  } catch (error) {
    return { success: false, message: error };
  }

  return { success: true, message: "Product deleted." };
}
