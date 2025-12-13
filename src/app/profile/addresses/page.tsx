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
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card className="shadow-sm">
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">My Addresses</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your saved delivery locations
          </p>
        </div>

        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="grid gap-4 md:grid-cols-2">
        {addresses.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            <MapPin className="mx-auto h-8 w-8 mb-3" />
            <p>No saved addresses yet</p>
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
              className="relative rounded-xl border p-4 transition hover:shadow-md"
            >
              {/* ADDRESS TYPE BADGE */}
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs capitalize">
                {isHome ? (
                  <Home className="h-3 w-3" />
                ) : (
                  <Briefcase className="h-3 w-3" />
                )}
                {address.addressType}
              </div>

              {/* MAIN CONTENT */}
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary" />

                <div className="flex-1">
                  <p className="font-medium">{address.lineOne}</p>

                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} – {address.zip}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {address.country}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setEditAddress(address)}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => deleteAddress(address._id)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>

      {/* EDIT DIALOG */}
      <Dialog open={!!editAddress} onOpenChange={() => setEditAddress(null)}>
        <DialogContent>
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

      {/* ADD DIALOG */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
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
