"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
import { AvatarFallback } from "@/components/ui/avatar";
import { productFallback, profileFallBack } from "@/lib/utils/constants";

/* ---------------------- SKELETON ---------------------- */
const ProductPageSkeleton = () => (
  <div className="container mx-auto max-w-7xl px-4 py-6">
    <div className="grid md:grid-cols-2 gap-8">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
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
    <div className="min-h-screen relative">
      {/* MAIN CONTENT */}
      <div className="container mx-auto max-w-7xl px-4 py-6 pb-32">
        <div className="grid md:grid-cols-2 gap-8">
          {/* IMAGE */}
          <div className="aspect-square relative rounded-xl overflow-hidden border">
            <OptimizedImage
              src={product.imageurl}
              alt={product.name}
              fallback="/product.webp"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* RATING */}
            <div className="mt-2 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < stars
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount || 0})
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold">₹{product.price}</p>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* FEATURES */}
            {product.features && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Key Features</h3>

                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-6">
              <label className="text-sm font-medium">Quantity</label>
              <div className="mt-2 flex items-center border rounded-md w-fit overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  readOnly
                  value={quantity}
                  className="w-14 text-center border-0 focus-visible:ring-0"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {!reviewLoading && currentProductReview?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet.
                  </p>
                )}

                {currentProductReview?.map((r) => {
                  const stars = Math.round(r?.rating || 0);

                  return (
                    <div
                      key={r?._id}
                      className="p-3 border rounded-lg flex gap-3"
                    >
                      {/* Avatar */}
                      <OptimizedImage
                        src={r?.userProfilePicture || profileFallBack}
                        alt={r?.userName || "User"}
                        fallback={profileFallBack}
                        className="rounded-full"
                        isAvatar
                      />

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {r?.userName || "Anonymous"}
                          </p>

                          {/* ⭐ Rating */}
                          <div className="flex gap-0.5">
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
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mt-1">
                          {r?.comment || "No comment provided."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                size="sm"
                variant="secondary"
                className="mt-4"
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
        <div className="container mx-auto max-w-7xl p-3 flex gap-3">
          <Button
            className="flex-1"
            disabled={loading}
            onClick={() => addToCart(quantity)}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Add to cart"
            )}
          </Button>

          <Button
            variant="secondary"
            className="flex-1"
            disabled={loading}
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
