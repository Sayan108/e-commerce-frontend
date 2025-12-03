'use client';
import { useAuth } from '@/context/auth-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
    const { user } = useAuth();

    if (!user) return <div>Loading orders...</div>

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>View your order history and status.</CardDescription>
            </CardHeader>
            <CardContent>
                {user.orders.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No Orders Yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">You haven't placed any orders with us.</p>
                        <Button asChild className="mt-4">
                            <Link href="/categories">Start Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user.orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">...{order.id.slice(-6)}</TableCell>
                                    <TableCell>{format(new Date(order.date), "PPP")}</TableCell>
                                    <TableCell><Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge></TableCell>
                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/profile/orders/${order.id}`}>View Details</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
