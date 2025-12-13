"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAddress } from "@/hooks/useAddress";
import {
  PlusCircle,
  Home,
  Truck,
  CreditCard,
  MapPin,
  Check,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressForm } from "@/components/address/addressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddressPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    addresses,
    loading,
    currentShippingAddress,
    currentbillingAddress,
    saveAddress,
    fetchAddress,
    selectBillingAddress,
    selectShipingAddress,
  } = useAddress();

  useEffect(() => {
    fetchAddress();
  }, []);

  const AddressSkeleton = () => (
    <div className="space-y-3">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-3 rounded-xl border p-4">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="py-10 text-center text-muted-foreground">
      <MapPin className="mx-auto mb-2 h-6 w-6" />
      No saved addresses found
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Shipping Address</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {loading && <AddressSkeleton />}
          {!loading && addresses.length === 0 && <EmptyState />}

          {!loading && addresses.length > 0 && (
            <RadioGroup
              value={currentShippingAddress?._id}
              className="space-y-4"
            >
              {addresses.map((address) => (
                <Label
                  key={address._id}
                  htmlFor={`shipping-${address._id}`}
                  className="flex cursor-pointer gap-3 rounded-xl border p-4 transition hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-secondary/40"
                >
                  <RadioGroupItem
                    value={address._id}
                    id={`shipping-${address._id}`}
                    onClick={() => selectShipingAddress(address)}
                  />
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-semibold capitalize">
                      {address.addressType} – {address.lineOne}, {address.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.state}, {address.zip}, {address.country}
                    </p>
                  </div>
                  {currentShippingAddress?._id === address._id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </Label>
              ))}
            </RadioGroup>
          )}

          <div className="pt-6 border-t flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Billing Address</CardTitle>
          </div>

          {loading && <AddressSkeleton />}
          {!loading && addresses.length === 0 && <EmptyState />}

          {!loading && addresses.length > 0 && (
            <RadioGroup
              value={currentbillingAddress?._id}
              className="space-y-4"
            >
              {addresses.map((address) => (
                <Label
                  key={address._id}
                  htmlFor={`billing-${address._id}`}
                  className="flex cursor-pointer gap-3 rounded-xl border p-4 transition hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-secondary/40"
                >
                  <RadioGroupItem
                    value={address._id}
                    id={`billing-${address._id}`}
                    onClick={() => selectBillingAddress(address)}
                  />
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-semibold capitalize">
                      {address.addressType} – {address.lineOne}, {address.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.state}, {address.zip}, {address.country}
                    </p>
                  </div>
                  {currentbillingAddress?._id === address._id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </Label>
              ))}
            </RadioGroup>
          )}

          <Button
            variant="outline"
            className="w-full flex items-center gap-2 rounded-xl"
            onClick={() => setModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Add New Address
          </Button>

          <Button
            size="lg"
            className="w-full rounded-xl"
            disabled={!currentShippingAddress || !currentbillingAddress}
            onClick={() => router.push("/checkout/payment")}
          >
            Continue to Payment
          </Button>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
          </DialogHeader>
          <AddressForm
            onSave={saveAddress}
            closeDialog={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
