"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useAddress } from "@/hooks/useAddress";
import { useOrders } from "@/hooks/useOrder";
import { OrderType } from "@/lib/redux/slices/order.slice";
import { Loader2, ArrowLeft } from "lucide-react";

export default function SummaryPage() {
  const router = useRouter();

  const { items: cartItemsO, draftCart, clearDraftCarts } = useCart();

  const { currentShippingAddress, currentbillingAddress } = useAddress();

  const { placeOrder, loading } = useOrders();

  const cartItems = draftCart?.length ? draftCart : cartItemsO;

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const hasMounted = useRef(false);

  const handlePlaceOrder = () => {
    if (!currentShippingAddress || !currentbillingAddress) return;
    placeOrder(draftCart?.length ? OrderType.items : OrderType.fullCart);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    return () => {
      console.log("real unmount");
      clearDraftCarts();
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* CART ITEMS */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-3 text-lg font-semibold">Order Items</h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : cartItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">Cart is empty</p>
              ) : (
                <ul className="divide-y">
                  {cartItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.thumbnail ?? ""}
                          alt={item.itemname}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded border object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium capitalize">
                            {item.itemname}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SUMMARY */}
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-sm">
              <p className="mb-1 font-medium">Shipping</p>
              {currentShippingAddress ? (
                <p className="text-muted-foreground">
                  {currentShippingAddress.lineOne},{" "}
                  {currentShippingAddress.city}
                </p>
              ) : (
                <p className="text-muted-foreground">No address selected</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-sm">
              <p className="mb-1 font-medium">Billing</p>
              {currentbillingAddress ? (
                <p className="text-muted-foreground">
                  {currentbillingAddress.lineOne}, {currentbillingAddress.city}
                </p>
              ) : (
                <p className="text-muted-foreground">No address selected</p>
              )}
            </CardContent>
          </Card>

          {/* STICKY CTA */}
          <div className="sticky bottom-0 bg-background pt-3">
            <Button
              className="w-full"
              disabled={
                loading ||
                !cartItems.length ||
                !currentShippingAddress ||
                !currentbillingAddress
              }
              onClick={handlePlaceOrder}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Place Order"
              )}
            </Button>

            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
