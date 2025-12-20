"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useOrders } from "@/hooks/useOrder";

/* ---------------- SKELETON ---------------- */
const OrdersSkeleton = () => (
  <Card>
    <CardHeader className="space-y-2">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-64" />
    </CardHeader>
    <CardContent className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </CardContent>
  </Card>
);

/* ---------------- STATUS BADGE ---------------- */
const StatusBadge = ({ status }: { status: string }) => (
  <Badge
    variant={
      status === "Delivered"
        ? "default"
        : status === "Processing"
        ? "secondary"
        : "outline"
    }
    className="capitalize"
  >
    {status}
  </Badge>
);

/* ---------------- PAGE ---------------- */
export default function OrdersPage() {
  const { getOrders, orders, loading, setCurrentOrder } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) return <OrdersSkeleton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">My Orders</CardTitle>
        <CardDescription>View your order history and status</CardDescription>
      </CardHeader>

      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-14 border-2 border-dashed rounded-lg">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Orders Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You haven’t placed any orders yet.
            </p>
            <Button asChild className="mt-4">
              <Link href="/categories">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* ================= MOBILE VIEW ================= */}
            <div className="space-y-4 md:hidden">
              {orders.map((order) => (
                <Card key={order.orderNumber} className="p-4">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-medium truncate max-w-[160px]">
                        {order.orderNumber}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{format(new Date(order.createdAt), "PPP")}</span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm font-medium">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                  >
                    <Link
                      href={`/profile/orders/${order._id}`}
                      onClick={() => setCurrentOrder(order)}
                    >
                      View Details
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>

            {/* ================= DESKTOP VIEW ================= */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        {order.orderNumber}
                      </TableCell>

                      <TableCell>
                        {format(new Date(order.createdAt), "PPP")}
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>

                      <TableCell className="text-right font-medium">
                        ₹{order.total.toFixed(2)}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href={`/profile/orders/${order._id}`}
                            onClick={() => setCurrentOrder(order)}
                          >
                            View Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
