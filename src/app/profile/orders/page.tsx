"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useOrders } from "@/hooks/useOrder";

// Skeleton Loader
const OrdersSkeleton = () => (
  <Card>
    <CardHeader className="space-y-2">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-64" />
    </CardHeader>

    <CardContent className="px-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableHead key={i}>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16 ml-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-9 w-24 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

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
        <CardDescription>View your order history and status.</CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        {orders.length === 0 ? (
          <div className="text-center py-14 border-2 border-dashed rounded-lg mx-4">
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Order ID</TableHead>
                  <TableHead className="min-w-[120px]">Date</TableHead>
                  <TableHead className="min-w-[120px]">Status</TableHead>
                  <TableHead className="text-right min-w-[100px]">
                    Total
                  </TableHead>
                  <TableHead className="text-right min-w-[120px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order._id}</TableCell>

                    <TableCell>
                      {format(new Date(order.createdAt), "PPP")}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Processing"
                            ? "secondary"
                            : "outline"
                        }
                        className="px-3 py-1"
                      >
                        {order.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      ₹{order.total.toFixed(2)}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link
                          onClick={() => {
                            setCurrentOrder(order);
                          }}
                          href={`/profile/orders/${order._id}`}
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
        )}
      </CardContent>
    </Card>
  );
}
