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
import { Edit, Trash, PlusCircle } from "lucide-react";

import { useAddress } from "@/hooks/useAddress";
import { Address } from "@/lib/redux/types/address.types";
import { AddressForm } from "@/components/address/addressForm";

/* ✅ FORM REMAINS SAME AS PREVIOUS MESSAGE */

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

  if (loading) return <Skeleton className="h-40 w-full" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>My Addresses</CardTitle>
        <Button onClick={() => setAddOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="border p-4 rounded-md flex justify-between"
          >
            <div>
              <p className="font-semibold capitalize">{address.addressType}</p>
              <p>
                {address.lineOne}, {address.city}, {address.state} -{" "}
                {address.zip}
              </p>
              <p className="text-xs">{address.country}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setEditAddress(address)}>
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                onClick={() => deleteAddress(address._id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>

      {/* ✅ EDIT */}
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

      {/* ✅ ADD */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
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
