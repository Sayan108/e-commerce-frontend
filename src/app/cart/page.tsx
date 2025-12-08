"use client";

import Image from "next/image";
import Link from "next/link";

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
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Shopping Cart
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          You have 5 item(s) in your cart.
        </p>
      </header>

      {/* {cartItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/categories">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-center p-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center border rounded-md mx-4">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 h-9 text-center border-0 focus-visible:ring-0 p-0"
                          readOnly
                        />
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="ml-4 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout/address">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )} */}
    </div>
  );
}
