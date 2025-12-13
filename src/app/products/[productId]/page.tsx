"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { useCart } from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import { navigate } from "@/hooks/useNavigation";

/* ---------------------- SKELETON ---------------------- */
const ProductPageSkeleton = () => (
  <div className="container mx-auto max-w-7xl px-4 py-8">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  </div>
);

/* ---------------------- REVIEW MODAL ---------------------- */
const ReviewModal = ({
  open,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-background w-full max-w-md rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>

        {/* Rating */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              onClick={() => setRating(i)}
              className={`w-6 h-6 cursor-pointer ${
                i <= rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <textarea
          className="w-full border rounded-md p-2 text-sm"
          rows={4}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={loading || !comment.trim()}
            onClick={() => {
              onSubmit(rating, comment);
              setComment("");
              setRating(5);
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

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
  const { addToCart, addToDraftCartAndCheckout, currentProductCount } =
    useCart();

  const [quantity, setQuantity] = useState(1);
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    if (product?._id) {
      setQuantity(currentProductCount(product._id));
      if (product?.rating > 0 || product?.reviewCount > 0) getProductReview();
    }
  }, [product?._id]);

  if (!product) return <ProductPageSkeleton />;

  const handleQuantityChange = (value: number) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  const handleAddReview = (rating: number, comment: string) => {
    postProductReview({
      productId: product._id,
      rating,
      comment,
    });
    setReviewOpen(false);
  };

  const stars = Math.round(product.rating || 4);

  return (
    <div className="relative min-h-screen pb-36">
      <div className="container mx-auto max-w-7xl px-4 py-8 pb-40">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* IMAGE */}
          <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-sm">
            <Image
              src={product.imageurl || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
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
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="mt-4 text-3xl font-bold">
              ₹{product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="mt-6 text-foreground/80">{product.description}</p>

            {/* QUANTITY */}
            <div className="mt-6">
              <label className="text-sm font-medium mb-1 block">Quantity</label>
              <div className="flex items-center border rounded-md bg-muted/40 h-10 w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  readOnly
                  value={quantity}
                  className="w-14 h-10 text-center border-0 py-0"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-10 border-t pt-6">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>

              {reviewsLoading && (
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              )}

              {!reviewsLoading && currentProductReview?.length === 0 && (
                <p className="mt-4 text-sm text-muted-foreground">
                  No reviews yet.
                </p>
              )}

              {/* ---------------------- REVIEWS ---------------------- */}
              <div className="mt-6 space-y-4">
                {/* Loading */}
                {reviewsLoading && (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg space-y-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Skeleton key={j} className="h-4 w-4 rounded" />
                          ))}
                        </div>
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </>
                )}

                {/* Empty State */}
                {!reviewsLoading && currentProductReview?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet. Be the first to review this product.
                  </p>
                )}

                {/* Reviews List */}
                {!reviewsLoading &&
                  currentProductReview?.map((r) => (
                    <div
                      key={r._id}
                      className="p-4 border rounded-lg bg-muted/20"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            r.userProfilePicture || "/avatar-placeholder.png"
                          }
                          alt={r.userName}
                          className="h-8 w-8 rounded-full object-cover"
                        />

                        <div>
                          <p className="text-sm font-medium">{r.userName}</p>

                          {/* Stars */}
                          <div
                            className="flex gap-1"
                            aria-label={`Rating: ${r.rating} out of 5`}
                          >
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < r.rating
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Comment */}
                      {r.comment && (
                        <p className="mt-3 text-sm text-foreground/80">
                          {r.comment}
                        </p>
                      )}
                    </div>
                  ))}
              </div>

              <Button
                className="mt-4"
                variant="secondary"
                onClick={() => setReviewOpen(true)}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4 z-50">
        <div className="container mx-auto max-w-7xl flex gap-3">
          <Button
            size="lg"
            className="flex-1"
            onClick={() => addToCart(quantity)}
          >
            Add to Cart
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="flex-1"
            onClick={() => {
              navigate("/checkout/address");
              addToDraftCartAndCheckout(quantity);
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
        onSubmit={handleAddReview}
      />
    </div>
  );
}
