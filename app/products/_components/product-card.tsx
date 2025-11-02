"use client";
import { IProduct } from "@/models/Product";
import { IUser } from "@/models/User";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AddToCartButton from "./add-to-cart-button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({
  product,
  user,
}: {
  product: IProduct;
  user: IUser;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={product._id.toString()}
      className="flex flex-col rounded-xl overflow-hidden hover:bg-accent/70 border cursor-pointer transition pb-4"
    >
      <Link href={`/products/${product._id}`}>
        {product.pictures?.[0] && (
          <div
            className="relative w-full h-48 bg-zinc-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={product.pictures[0]}
              alt={product.name}
              fill
              className={`object-contain ${
                isHovered ? "scale-105 rotate-6" : "scale-100"
              } transition-all duration-500 p-4`}
            />
          </div>
        )}
        <div className="px-4 py-2 space-y-2">
          <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 rounded-xs text-xs">
            {product.category.toUpperCase()}
          </Badge>
          <h2 className="text-base font-semibold">{product.name}</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(4.5) ? "text-yellow-400" : "text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {4.5} <span className="text-gray-600">({123})</span>
            </span>
          </div>
          
        </div>
      </Link>
      <div className="flex space-x-1 justify-between items-center mx-4">
        <p className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
          ${product.price.toFixed(2)}
        </p>
        {user?.role && product.stock > 0 &&
          <AddToCartButton user={user} product={product} />
        }
      </div>
    </div>
  );
}
