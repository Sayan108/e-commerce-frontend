"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAddress } from "@/hooks/useAddress";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddressPage() {
  const router = useRouter();

  const {
    addresses,
    loading,
    error,
    currentShippingAddress,
    currentbillingAddress,
    fetchAddress,
    selectBillingAddress,
    selectShipingAddress,
  } = useAddress();

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Select Shipping Address</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ================= LOADING SPINNER ================ */}

          {/* ================= SKELETON PLACEHOLDERS ================ */}
          {loading && (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 flex items-start space-x-3"
                >
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= NO ADDRESS FOUND ================ */}
          {!loading && addresses.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No saved addresses found.
            </div>
          )}

          {/* ================= SHIPPING ADDRESSES ================ */}
          {!loading && (
            <RadioGroup
              value={currentShippingAddress?._id}
              className="space-y-4"
            >
              {addresses.map((address) => (
                <Label
                  key={address._id}
                  htmlFor={`shipping-${address._id}`}
                  className="
                    flex items-start space-x-3 rounded-lg border p-4 cursor-pointer
                    has-[:checked]:border-primary has-[:checked]:bg-secondary/40
                  "
                >
                  <RadioGroupItem
                    value={address._id}
                    id={`shipping-${address._id}`}
                    onClick={() => selectShipingAddress(address)}
                  />

                  <div>
                    <p className="font-semibold capitalize">
                      {address.addressType} – {address.lineOne}, {address.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.state}, {address.zip}, {address.country}
                    </p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          )}

          {/* ================= BILLING SECTION TITLE ================ */}
          <div className="pt-4 border-t">
            <CardTitle className="text-xl">Select Billing Address</CardTitle>
          </div>

          {/* ================= BILLING SKELETON ================ */}
          {loading && (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 flex items-start space-x-3"
                >
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= BILLING ADDRESSES ================ */}
          {!loading && (
            <RadioGroup
              value={currentbillingAddress?._id}
              className="space-y-4"
            >
              {addresses.map((address) => (
                <Label
                  key={address._id}
                  htmlFor={`billing-${address._id}`}
                  className="
                    flex items-start space-x-3 rounded-lg border p-4 cursor-pointer
                    has-[:checked]:border-primary has-[:checked]:bg-secondary/40
                  "
                >
                  <RadioGroupItem
                    value={address._id}
                    id={`billing-${address._id}`}
                    onClick={() => selectBillingAddress(address)}
                  />

                  <div>
                    <p className="font-semibold capitalize">
                      {address.addressType} – {address.lineOne}, {address.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.state}, {address.zip}, {address.country}
                    </p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          )}

          {/* ================= ADD NEW ADDRESS BUTTON ================ */}
          {/* <Button
            variant="outline"
            className="w-full flex items-center gap-2 mt-4"
            onClick={() => router.push("/profile/address/add")}
          >
            <PlusCircle className="h-4 w-4" />
            Add New Address
          </Button> */}

          {/* ================= CONTINUE BUTTON ================ */}
          <Button
            disabled={!currentShippingAddress || !currentbillingAddress}
            onClick={() => router.push("/checkout/payment")}
            className="w-full mt-2"
            size="lg"
          >
            Continue to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
