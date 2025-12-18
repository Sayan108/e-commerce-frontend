"use client";

import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Check, Package, Truck, Home, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useOrder";
import OptimizedImage from "@/components/shared/errorHandledImage";
import { productFallback } from "@/lib/utils/constants";

/* ---------------- TRACKING STEPS ---------------- */
const trackingSteps = [
  { name: "Order Placed", icon: Check, status: "placed" },
  { name: "Shipped", icon: Package, status: "shipped" },
  { name: "Out for Delivery", icon: Truck, status: "outfordelivery" },
  { name: "Delivered", icon: Home, status: "delivered" },
];

/* ---------------- INVOICE ---------------- */
const downloadInvoice = (order: any) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("INVOICE", 14, 20);

  doc.setFontSize(11);
  doc.text(`Order ID: ${order._id}`, 14, 30);
  doc.text(`Order Date: ${format(new Date(order.createdAt), "PPP")}`, 14, 36);

  doc.text("Shipping Address:", 14, 48);
  doc.text(order.shippingaddress, 14, 54);

  doc.text("Billing Address:", 110, 48);
  doc.text(order.billingaddress || order.shippingaddress, 110, 54);

  autoTable(doc, {
    startY: 80,
    head: [["Product", "Qty", "Price", "Total"]],
    body: order.items.map((item: any) => [
      item.productname,
      item.quantity,
      `₹${item.price}`,
      `₹${(item.price * item.quantity).toFixed(2)}`,
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [0, 0, 0] },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.text(`Total Amount: ₹${order.total.toFixed(2)}`, 14, finalY);

  doc.save(`invoice-${order._id}.pdf`);
};

/* ---------------- SKELETON ---------------- */
const OrderDetailSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-40" />
  </div>
);

/* ---------------- PAGE ---------------- */
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
    <div className="space-y-8 pb-24">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Order #{order._id.slice(-6)}
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
              {order.status}
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Placed on {format(new Date(order.createdAt), "PPP")}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => downloadInvoice(order)}
        >
          <FileDown className="w-4 h-4" /> Invoice
        </Button>
      </div>

      {/* TRACKING */}
      <Card>
        <CardHeader>
          <CardTitle>Order Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex justify-between items-center px-4">
            <div className="absolute top-5 left-0 right-0 h-1 bg-border" />
            <div
              className="absolute top-5 left-0 h-1 bg-primary"
              style={{ width: `${(currentStepIndex / 3) * 100}%` }}
            />

            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              const active = index <= currentStepIndex;

              return (
                <div
                  key={step.name}
                  className="flex flex-col items-center z-10"
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-11 h-11 rounded-full border-2",
                      active
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-muted border-border"
                    )}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <p className="text-xs mt-2 text-center font-medium">
                    {step.name}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ITEMS */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {order.items.map((item: any) => (
              <li key={item.productId} className="flex gap-4 py-4 items-center">
                <OptimizedImage
                  src={item.thumbnail || productFallback}
                  alt={item.itemname}
                  fallback={productFallback}
                  className="rounded-lg object-cover border"
                />

                <div className="flex-grow">
                  <p className="font-medium">{item.itemname}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty × {item.quantity}
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

      {/* ADDRESS + SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <CardTitle>Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{order.shippingaddress}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            <CardTitle>Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">
              {order.billingaddress || order.shippingaddress}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
