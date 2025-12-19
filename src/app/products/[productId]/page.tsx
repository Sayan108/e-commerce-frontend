"use client";

import { useEffect, useState } from "react";
import { Star, Minus, Plus, Loader } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { useCart } from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import { navigate } from "@/hooks/useNavigation";
import { ReviewModal } from "@/components/shared/reviewModal";
import OptimizedImage from "@/components/shared/errorHandledImage";
import { productFallback, profileFallBack } from "@/lib/utils/constants";

/* ---------------------- SKELETON ---------------------- */
const ProductPageSkeleton = () => (
  <div className="container mx-auto px-4 py-6">
    <div className="space-y-6">
      <Skeleton className="h-72 w-full rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

/* ---------------------- MAIN PAGE ---------------------- */
export default function ProductPage() {
  const {
    currentProduct: product,
    loading: productLoading,
    getProductDetails,
    postProductReview,
    reviewLoading,
    currentProductReview,
  } = useProducts();

  const {
    addToCart,
    addToDraftCartAndCheckout,
    currentProductCount,
    loading,
    clearDraftCarts,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [reviewOpen, setReviewOpen] = useState(false);

  const params = useParams<any>();

  useEffect(() => {
    if (params.productId) {
      clearDraftCarts();
      getProductDetails(params.productId);
      setQuantity(currentProductCount(params.productId) || 1);
    }
  }, [params.productId]);

  if (productLoading || !product) return <ProductPageSkeleton />;

  const stars = Math.round(product.rating);

  return (
    <div className="min-h-screen pb-28">
      {/* MAIN */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* IMAGE */}
          <div className="relative w-full h-72 md:h-auto md:aspect-square rounded-xl overflow-hidden border">
            <OptimizedImage
              src={product.imageurl || productFallback}
              alt={product.name}
              fallback={productFallback}
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-bold leading-snug">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="mt-2 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < stars
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount || 0})
              </span>
            </div>

            {/* PRICE */}
            <p className="mt-3 text-2xl md:text-3xl font-bold">
              ₹{product.price}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              {product.description}
            </p>

            {/* FEATURES */}
            {product.features?.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {product.features.map((f, i) => (
                    <li key={i}>{f.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-5">
              <p className="text-sm font-medium mb-1">Quantity</p>
              <div className="flex items-center border rounded-md w-fit">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  readOnly
                  value={quantity}
                  className="w-12 text-center border-0 focus-visible:ring-0"
                />

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-6">
              <h3 className="text-base font-semibold mb-2">Customer Reviews</h3>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {!reviewLoading && currentProductReview?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet.
                  </p>
                )}

                {currentProductReview?.map((r) => {
                  const rs = Math.round(r.rating || 0);
                  return (
                    <div
                      key={r._id}
                      className="p-2 border rounded-lg flex gap-3"
                    >
                      <OptimizedImage
                        src={r.userProfilePicture || profileFallBack}
                        alt={r.userName || "User"}
                        fallback={profileFallBack}
                        isAvatar
                        className="h-8 w-8"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">
                            {r.userName || "Anonymous"}
                          </p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < rs
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {r.comment}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                size="sm"
                variant="secondary"
                className="mt-3"
                onClick={() => setReviewOpen(true)}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY FOOTER */}
      <div className="fixed bottom-0 inset-x-0 bg-background border-t z-50">
        <div className="flex gap-3 p-3">
          <Button className="flex-1" onClick={() => addToCart(quantity)}>
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Add to cart"
            )}
          </Button>

          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              addToDraftCartAndCheckout(quantity);
              navigate("/checkout/address");
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* REVIEW MODAL */}
      <ReviewModal
        open={reviewOpen}
        loading={reviewLoading}
        onClose={() => setReviewOpen(false)}
        onSubmit={(rating, comment) => {
          postProductReview({ productId: product._id, rating, comment });
          setReviewOpen(false);
        }}
      />
    </div>
  );
}
