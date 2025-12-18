"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart"; // <-- Your hook

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { CartItem } from "@/lib/redux/types/cart.types";
import { useEffect } from "react";
import OptimizedImage from "@/components/shared/errorHandledImage";
import { productFallback } from "@/lib/utils/constants";

export default function CartPage() {
  const {
    items: cartItems,
    updateCart: updateQuantity,
    deleteCart: removeFromCart,
    fetchCart,
  } = useCart();
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Your Cart
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {cartItems.length > 0
            ? `You have ${cartItems.length} item(s) in your cart.`
            : "Review items before checkout."}
        </p>
      </header>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/categories">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT SIDE — CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cartItems.map((item: CartItem) => (
                    <li
                      key={item._id}
                      className="flex flex-col md:flex-row items-start md:items-center p-5 gap-5"
                    >
                      {/* IMAGE */}
                      <OptimizedImage
                        src={item.thumbnail ?? productFallback}
                        alt={item.itemname}
                        fallback={productFallback}
                      />

                      {/* DETAILS */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-xl">
                          {item.itemname}
                        </h3>
                        <p className="text-muted-foreground">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <p className="text-sm mt-1 text-green-600">In stock</p>
                      </div>

                      {/* QUANTITY */}
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity({
                              _id: item._id,
                              quantity: item.quantity - 1,
                            })
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <Input
                          type="number"
                          readOnly
                          value={item.quantity}
                          className="w-12 text-center border-0 focus:ring-0 p-0"
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity({
                              _id: item._id,
                              quantity: item.quantity + 1,
                            })
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* ITEM TOTAL */}
                      <p className="font-semibold w-24 text-right">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>

                      {/* DELETE */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item._id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild size="lg" className="w-full gap-2">
                  <Link href="/checkout/address">
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
