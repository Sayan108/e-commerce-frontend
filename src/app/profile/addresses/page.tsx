"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash, Plus, MapPin, Home, Briefcase } from "lucide-react";

import { useAddress } from "@/hooks/useAddress";
import { Address } from "@/lib/redux/types/address.types";
import { AddressForm } from "@/components/address/addressForm";

export default function AddressesPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  const {
    addresses,
    loading,
    error,
    fetchAddress,
    saveAddress,
    updateAddress,
    deleteAddress,
  } = useAddress();

  useEffect(() => {
    fetchAddress();
  }, []);

  if (loading)
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card className="shadow-sm">
      {/* HEADER */}
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg sm:text-xl">My Addresses</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your saved delivery locations
          </p>
        </div>

        <Button onClick={() => setAddOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {addresses.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <MapPin className="mx-auto h-8 w-8 mb-3" />
            <p className="text-sm">No saved addresses yet</p>
            <Button className="mt-4" onClick={() => setAddOpen(true)}>
              Add your first address
            </Button>
          </div>
        )}

        {addresses.map((address) => {
          const isHome = address.addressType === "home";

          return (
            <div
              key={address._id}
              className="rounded-xl border p-4 transition hover:shadow-md bg-background"
            >
              {/* HEADER ROW */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-medium capitalize">
                  {address.addressType === "home" ? (
                    <Home className="h-4 w-4 text-primary" />
                  ) : (
                    <Briefcase className="h-4 w-4 text-primary" />
                  )}
                  {address.addressType}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditAddress(address)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteAddress(address._id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              {/* ADDRESS BODY */}
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="font-medium break-words leading-snug">
                    {address.lineOne}
                  </p>

                  <p className="text-sm text-muted-foreground break-words">
                    {address.city}, {address.state} – {address.zip}
                  </p>

                  <p className="text-xs text-muted-foreground break-words">
                    {address.country}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>

      {/* EDIT */}
      <Dialog open={!!editAddress} onOpenChange={() => setEditAddress(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>

          {editAddress && (
            <AddressForm
              address={editAddress}
              onSave={updateAddress}
              closeDialog={() => setEditAddress(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ADD */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>

          <AddressForm
            onSave={saveAddress}
            closeDialog={() => setAddOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
