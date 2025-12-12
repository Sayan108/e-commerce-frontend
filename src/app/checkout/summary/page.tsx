"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useAddress } from "@/hooks/useAddress";
import { Loader2 } from "lucide-react";
import { useOrders } from "@/hooks/useOrder";
import { OrderType } from "@/lib/redux/slices/order.slice";

export default function SummaryPage() {
  const router = useRouter();

  const { items: cartItems, loading: cartLoading } = useCart();
  const {
    currentShippingAddress,
    currentbillingAddress,
    loading: addressLoading,
  } = useAddress();

  const loading = cartLoading || addressLoading;

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const { placeOrder } = useOrders();

  const handlePlaceOrder = () => {
    if (!currentShippingAddress || !currentbillingAddress) return;
    placeOrder(OrderType.fullCart);
  };

  return (
    <div className="mx-auto max-w-6xl py-10 px-4 md:px-0">
      <div className="grid md:grid-cols-3 gap-10">
        {/* LEFT – ORDER ITEMS */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Order Items
              </CardTitle>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin h-6 w-6 text-primary" />
                </div>
              ) : cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.thumbnail ?? ""}
                          alt={item.itemname}
                          width={80}
                          height={80}
                          className="rounded-md object-cover border w-20 h-20"
                        />
                        <div>
                          <h3 className="font-medium text-base capitalize">
                            {item.itemname}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-semibold text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="space-y-6">
          {/* PRICE SUMMARY */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Price Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          {/* SHIPPING ADDRESS */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              {addressLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : currentShippingAddress ? (
                <div className="space-y-1">
                  <p className="font-medium">
                    {currentShippingAddress.lineOne}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentShippingAddress.city},{" "}
                    {currentShippingAddress.state}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentShippingAddress.zip},{" "}
                    {currentShippingAddress.country}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No shipping address selected.
                </p>
              )}
            </CardContent>
          </Card>

          {/* BILLING ADDRESS */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              {addressLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : currentbillingAddress ? (
                <div className="space-y-1">
                  <p className="font-medium">{currentbillingAddress.lineOne}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentbillingAddress.city}, {currentbillingAddress.state}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentbillingAddress.zip}, {currentbillingAddress.country}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No billing address selected.
                </p>
              )}
            </CardContent>
          </Card>

          {/* BUTTONS */}
          <Button
            size="lg"
            className="w-full"
            disabled={
              loading ||
              cartItems.length === 0 ||
              !currentShippingAddress ||
              !currentbillingAddress
            }
            onClick={handlePlaceOrder}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Place Order"
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
