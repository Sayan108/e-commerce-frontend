"use client";

import { notFound } from "next/navigation";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Check, Package, Truck, Home, FileDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useOrders } from "@/hooks/useOrder";
import OptimizedImage from "@/components/shared/errorHandledImage";
import { productFallback } from "@/lib/utils/constants";
import { Order, OrderItem } from "@/lib/redux/types/order.types";

/* ---------------- INVOICE ---------------- */
const downloadInvoice = (order: Order) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("INVOICE", 14, 20);

  doc.setFontSize(11);
  doc.text(`Order ID: ${order._id}`, 14, 30);
  doc.text(`Order Date: ${format(new Date(order.createdAt), "PPP")}`, 14, 36);

  autoTable(doc, {
    startY: 60,
    head: [["Product", "Qty", "Price", "Total"]],
    body: order.items.map((item) => [
      item.itemname,
      item.quantity,
      `₹${item.price}`,
      `₹${(item.price * item.quantity).toFixed(2)}`,
    ]),
  });

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold flex flex-wrap items-center gap-2">
            Order #{order.orderNumber}
            <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
              {order.status}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Placed on {format(new Date(order.createdAt), "PPP")}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadInvoice(order)}
          className="flex items-center gap-2 self-start sm:self-auto"
        >
          <FileDown className="w-4 h-4" />
          Invoice
        </Button>
      </div>

      {/* ITEMS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Order Items</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="divide-y">
            {order.items.map((item: OrderItem) => (
              <li key={item.productId} className="flex items-start gap-4 py-4">
                {/* IMAGE */}
                <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                  <OptimizedImage
                    src={item.thumbnail || productFallback}
                    alt={item.itemname}
                    fallback={productFallback}
                    className="object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium leading-snug break-words">
                    {item.itemname}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Qty × {item.quantity}
                  </p>
                </div>

                {/* PRICE */}
                <p className="text-sm sm:text-base font-semibold whitespace-nowrap">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ADDRESS + SUMMARY */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <CardTitle className="text-base sm:text-lg">Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm whitespace-pre-line">
              {order.shippingaddress}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <CardTitle className="text-base sm:text-lg">Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm whitespace-pre-line">
              {order.billingaddress || order.shippingaddress}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Subtotal</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base sm:text-lg font-bold">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
