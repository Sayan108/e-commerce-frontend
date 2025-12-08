"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Address } from "@/lib/types";
import { PlusCircle } from "lucide-react";

// Mock address form, in a real app this would be more robust
const AddressForm = ({
  onSave,
}: {
  onSave: (address: Omit<Address, "id">) => void;
}) => {
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type: "Home",
      line1,
      city,
      state: "CA",
      zip: "90210",
      country: "USA",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Address Line 1"
        value={line1}
        onChange={(e) => setLine1(e.target.value)}
        required
      />
      <Input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <Button type="submit">Save Address</Button>
    </form>
  );
};

export default function AddressPage() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useLocalStorage<
    string | undefined
  >("selectedAddress", undefined);
  const [isAdding, setIsAdding] = useState(false);

  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       router.push("/login?redirect=/checkout/address");
  //     }
  //   }, [isAuthenticated, router]);

  const handleSaveAddress = (address: Omit<Address, "id">) => {
    setIsAdding(false);
  };

  //   if (!user) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            {/* {user.addresses.map((address) => (
              <Label
                key={address.id}
                htmlFor={address.id}
                className="flex items-center space-x-2 border rounded-md p-4 has-[:checked]:bg-secondary has-[:checked]:border-primary"
              >
                <RadioGroupItem value={address.id} id={address.id} />
                <div>
                  <p className="font-semibold">
                    {address.type} - {address.line1}, {address.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.state}, {address.zip}
                  </p>
                </div>
              </Label>
            ))} */}
          </RadioGroup>

          {isAdding ? (
            <AddressForm onSave={handleSaveAddress} />
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsAdding(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
            </Button>
          )}

          <Button
            disabled={!selectedAddress}
            onClick={() => router.push("/checkout/payment")}
            className="w-full"
            size="lg"
          >
            Continue to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Minimal input for the mock address form
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
  />
);
