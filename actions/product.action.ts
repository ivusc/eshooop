"use server"

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function getProducts(){
  await connectToDatabase();
  const products = await Product.find().lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getProduct(id: string){
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  if (!product) throw new Error('Product not found');
  return JSON.parse(JSON.stringify(product));
}