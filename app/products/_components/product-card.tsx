"use client";
import { IProduct } from "@/models/Product";
import { IUser } from "@/models/User";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AddToCartButton from "./add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ProductRating from "./product-rating";

export default function ProductCard({
  product,
  user,
}: {
  product: IProduct;
  user: IUser;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      key={product._id.toString()}
      className="flex flex-col rounded-xl overflow-hidden border-none bg-accent/70 hover:bg-accent pt-0 cursor-pointer transition pb-4"
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
                isHovered ? "scale-105" : "scale-100"
              } transition-all duration-500 p-4`}
            />
          </div>
        )}
        <div className="px-4 py-2 space-y-2">
          <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 rounded-md text-xs">
            {product.category.toUpperCase()}
          </Badge>
          <h2 className="text-base font-semibold">{product.name}</h2>
          <ProductRating productRating={product.avgRating} reviewCount={product.reviewCount}/>        
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
    </Card>
  );
}
