"use client";

import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import jsPDF from "jspdf";
import { Check, Package, Truck, Home, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useOrder";

const trackingSteps = [
  { name: "Order Placed", icon: Check, status: "placed" },
  { name: "Shipped", icon: Package, status: "shipped" },
  { name: "Out for Delivery", icon: Truck, status: "outfordelivery" },
  { name: "Delivered", icon: Home, status: "delivered" },
];

// ---------- INVOICE DOWNLOAD ----------
const downloadInvoice = (order: any) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Invoice", 15, 20);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order._id}`, 15, 35);
  doc.text(`Date: ${format(new Date(order.createdAt), "PPP")}`, 15, 45);

  // Addresses
  doc.text("Shipping Address:", 15, 60);
  doc.text(order.shippingaddress, 15, 68);

  doc.text("Billing Address:", 15, 85);
  doc.text(order.billingaddress || order.shippingaddress, 15, 93);

  // Items
  let yPos = 110;
  doc.text("Items:", 15, yPos);

  order.items.forEach((item: any) => {
    yPos += 10;
    doc.text(
      `${item.productname} (x${item.quantity}) — ₹${(
        item.price * item.quantity
      ).toFixed(2)}`,
      15,
      yPos
    );
  });

  yPos += 15;
  doc.text(`Total: ₹${order.total.toFixed(2)}`, 15, yPos);

  doc.save(`invoice-${order._id}.pdf`);
};

// ---------- SKELETON ----------
const OrderDetailSkeleton = () => (
  <div className="space-y-8 px-1">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
    </Card>
  </div>
);

// ---------- MAIN COMPONENT ----------
export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { currentOrder: order } = useOrders();

  if (order === undefined) return <OrderDetailSkeleton />;
  if (order === null) notFound();

  const currentStepIndex =
    trackingSteps.findIndex((s) => s.status === order.status) || 0;

  return (
    <div className="space-y-8 px-1">
      {/* HEADER + DOWNLOAD */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h1>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => downloadInvoice(order)}
        >
          <FileDown className="w-4 h-4" />
          Download Invoice
        </Button>
      </div>

      {/* MAIN ORDER CARD */}
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on {format(new Date(order.createdAt), "PPP")}
          </p>
        </CardHeader>

        <CardContent>
          {/* TRACKING STEPS */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>

            <div className="relative flex justify-between items-center px-4">
              <div className="absolute top-5 left-0 right-0 h-1 bg-border" />
              <div
                className="absolute top-5 left-0 h-1 bg-primary transition-all"
                style={{ width: `${(currentStepIndex / 3) * 100}%` }}
              />

              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                const active = index <= currentStepIndex;

                return (
                  <div
                    key={step.name}
                    className="flex flex-col items-center z-10 w-20"
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                        active
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-muted border-border"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs mt-2 text-center font-medium">
                      {step.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator className="my-8" />

          {/* ORDER ITEMS */}
          <ul className="divide-y">
            {order.items.map((item) => (
              <li key={item.productId} className="flex gap-4 py-4 items-center">
                <Image
                  src={item.thumbnail || "/placeholder.png"}
                  alt={item.productname}
                  width={80}
                  height={80}
                  className="rounded-md object-cover bg-muted"
                />

                <div className="flex-grow">
                  <h3 className="font-semibold">{item.productname}</h3>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* SHIPPING + BILLING + SUMMARY */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* SHIPPING */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{order.shippingaddress}</p>
          </CardContent>
        </Card>

        {/* BILLING */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">
              {order.billingaddress || order.shippingaddress}
            </p>
          </CardContent>
        </Card>

        {/* SUMMARY */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
