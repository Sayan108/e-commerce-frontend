"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { useCart } from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import { navigate } from "@/hooks/useNavigation";
import { ReviewModal } from "@/components/shared/reviewModal";

/* ---------------------- SKELETON ---------------------- */
const ProductPageSkeleton = () => (
  <div className="container mx-auto max-w-7xl px-4 py-6">
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
      <Skeleton className="aspect-square w-full rounded-lg" />
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
export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const {
    currentProduct: product,
    loading: reviewsLoading,
    getProductReview,
    postProductReview,
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

  useEffect(() => {
    if (product?._id) {
      clearDraftCarts();
      setQuantity(currentProductCount(product._id));
      if (product?.rating > 0 || product?.reviewCount > 0) getProductReview();
    }
  }, [product?._id]);

  if (!product) return <ProductPageSkeleton />;

  const stars = Math.round(product.rating || 4);

  return (
    <div className="min-h-screen relative">
      {/* MAIN CONTENT */}
      <div className="container mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-20">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
          {/* IMAGE */}
          <div className="aspect-square relative w-full rounded-lg overflow-hidden">
            <Image
              src={product.imageurl || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="mt-2 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < stars
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold">₹{product.price}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {product.description}
            </p>

            {/* QUANTITY */}
            <div className="mt-5">
              <label className="text-sm font-medium">Quantity</label>
              <div className="mt-1 flex items-center border rounded-md w-fit">
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
                  className="w-14 text-center border-0"
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
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>

              <div className="mt-3 space-y-3">
                {!reviewsLoading && currentProductReview?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet.
                  </p>
                )}

                {currentProductReview?.map((r) => (
                  <div
                    key={r?._id}
                    className="p-3 border rounded-lg flex items-start gap-3"
                  >
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                      <Image
                        src={r?.userProfilePicture || "/avatar-placeholder.png"}
                        alt={r?.userName || "User"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>

                    {/* Review Content */}
                    <div>
                      <p className="text-sm font-medium">{r?.userName}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {r?.comment}
                      </p>
                    </div>
                  </div>
                ))}
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
      <div className="fixed bottom-0 inset-x-0 bg-background border-t p-3">
        <div className="container mx-auto max-w-7xl flex gap-3">
          <Button className="flex-1" onClick={() => addToCart(quantity)}>
            {loading ? <Loader className="h-4 w-4" /> : "Add to cart"}
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
        loading={reviewsLoading}
        onClose={() => setReviewOpen(false)}
        onSubmit={(rating, comment) => {
          postProductReview({ productId: product._id, rating, comment });
          setReviewOpen(false);
        }}
      />
    </div>
  );
}
