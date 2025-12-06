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
    <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="space-y-6 md:space-y-8">
        {/* Product Image and Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Product Image */}
          <div className="relative w-full aspect-square md:min-h-96 rounded-xl overflow-hidden shadow-md bg-zinc-100">
            {product.pictures?.[0] && (
              <Image
                src={product.pictures[0]}
                alt={product.name}
                fill
                className="object-contain p-2 sm:p-4"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 rounded-md text-xs">
                  {product.category.toUpperCase()}
                </Badge>
                <ProductRating
                  productRating={product.avgRating}
                  reviewCount={product.reviewCount}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Stock: <span className="font-semibold">{product.stock} available</span>
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:flex gap-3 pt-2">
              <div className="col-span-1">
                <AddToCartButton user={user} product={product} />
              </div>
              <div className="col-span-1">
              <SaveButton
                saved={
                  user?.savedProducts.find(
                    (id) => id.toString() === product._id.toString()
                  )
                    ? true
                    : false
                }
                  user={user}
                  product={product}
                />
              </div>
            </div>

            {/* Shipping Info */}
            <Card className="rounded-xl hover:bg-zinc-800 transition-all duration-200 border-none bg-accent/70">
              <CardContent className="flex items-center gap-3 sm:gap-4 p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0">
                  🚚
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                    Free Shipping
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Delivery in 2-3 business days</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <Card className="text-center border-none bg-accent/70 hover:bg-accent p-3 sm:p-4 transition-colors">
            <div className="text-2xl sm:text-3xl mb-2">🔒</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Secure Payment</p>
          </Card>
          <Card className="text-center border-none bg-accent/70 hover:bg-accent p-3 sm:p-4 transition-colors">
            <div className="text-2xl sm:text-3xl mb-2">↩️</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Easy Returns</p>
          </Card>
          <Card className="text-center border-none bg-accent/70 hover:bg-accent p-3 sm:p-4 transition-colors">
            <div className="text-2xl sm:text-3xl mb-2">✓</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Quality Guarantee</p>
          </Card>
        </div>

        {/* Review Form */}
        {user && (
          <div className="pt-4 sm:pt-6 border-t">
            <ReviewForm
              userId={user._id.toString()}
              productId={product._id.toString()}
            />
          </div>
        )}

        {/* Review List */}
        <div className="pt-4 sm:pt-6 border-t">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </main>
  );
}
