import { getSession } from "@/actions/auth.actions";
import { getProduct } from "@/actions/product.action";
import { getUser } from "@/actions/user.actions";
import { IProduct } from "@/models/Product";
import { IUser } from "@/models/User";
import Image from "next/image";
import AddToCartButton from "../_components/add-to-cart-button";
import ReviewList from "./review-list";
import { getReviews } from "@/actions/review.actions";
import { IReview } from "@/models/Review";
import ReviewForm from "./review-form";
import ProductRating from "../_components/product-rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SaveButton from "../_components/save-button";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product: IProduct = await getProduct(id);
  const reviews: IReview[] = await getReviews(product._id.toString());
  const session = await getSession();
  let user: IUser | null = null;
  if (session) user = await getUser(session?.email);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full min-h-96 rounded-xl overflow-hidden shadow-md">
          {product.pictures?.[0] && (
            <div className="h-full w-full bg-zinc-100">
              <Image
                src={product.pictures[0]}
                alt={product.name}
                fill
                className="object-cover p-2"
              />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 rounded-md text-xs">
            {product.category.toUpperCase()}
          </Badge>
          <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6">{product.description}</p>

          <div className="flex items-center gap-4">
            <AddToCartButton user={user} product={product} />
            <SaveButton
              saved={
                user!.savedProducts.find(
                  (id) => id.toString() === product._id.toString()
                )
                  ? true
                  : false
              }
              user={user}
              product={product}
            />
            <span className="text-gray-500">Stock: {product.stock}</span>
          </div>
          <div className="my-6">
            <ProductRating
              productRating={product.avgRating}
              reviewCount={product.reviewCount}
            />
          </div>
          <div>
            <Card className="px-2 rounded-xl hover:bg-zinc-800 transition-all duration-200 border-none">
              <CardContent className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  🚚
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-1">
                    Free Shipping
                  </h3>
                  <p className="text-sm">Delivery in 2-3 business days</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="col-span-2 grid grid-cols-3 gap-4 pt-4">
          <Card className="text-center border-none bg-accent/70 hover:bg-accent">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-sm text-gray-400">Secure Payment</p>
          </Card>
          <Card className="text-center border-none bg-accent/70 hover:bg-accent">
            <div className="text-2xl mb-1">↩️</div>
            <p className="text-sm text-gray-400">Easy Returns</p>
          </Card>
          <Card className="text-center border-none bg-accent/70 hover:bg-accent">
            <div className="text-2xl mb-1">✓</div>
            <p className="text-sm text-gray-400">Quality Guarantee</p>
          </Card>
        </div>

        {/* Review Form */}
        <div className="col-span-2">
          {user && (
            <ReviewForm
              userId={user._id.toString()}
              productId={product._id.toString()}
            />
          )}
        </div>

        <div className="mt-12">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </main>
  );
}
