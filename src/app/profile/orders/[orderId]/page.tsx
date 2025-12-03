'use client';
import { useAuth } from '@/context/auth-content';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import Image from 'next/image';
import { Check, Package, Truck, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const trackingSteps = [
    { name: 'Order Placed', icon: Check, status: 'Pending'},
    { name: 'Shipped', icon: Package, status: 'Shipped'},
    { name: 'Out for Delivery', icon: Truck, status: 'Shipped'},
    { name: 'Delivered', icon: Home, status: 'Delivered'},
];

const OrderDetailSkeleton = () => (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
                <div className="mb-8">
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <div className="flex justify-between">
                        {Array.from({length: 4}).map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-4 w-20 mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="space-y-4">
                    {Array.from({length: 2}).map((_, i) => (
                         <div key={i} className="flex items-center py-4">
                             <Skeleton className="h-20 w-20 rounded-md" />
                             <div className="ml-4 flex-grow space-y-2">
                                 <Skeleton className="h-5 w-3/4" />
                                 <Skeleton className="h-4 w-1/4" />
                             </div>
                             <Skeleton className="h-6 w-16" />
                         </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Separator />
                    <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
        </div>
    </div>
);


export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
    const { user } = useAuth();
    const [order, setOrder] = useState<Order | undefined>(undefined);

    useEffect(() => {
        if (user) {
            const foundOrder = user.orders.find(o => o.id === params.orderId);
            setTimeout(() => {
                if (foundOrder) {
                    setOrder(foundOrder);
                } else {
                    setOrder(undefined); // Explicitly set to allow notFound() to trigger
                }
            }, 500); // Simulate loading
        }
    }, [user, params.orderId]);

    if (order === undefined && user) { // Loading state
        return <OrderDetailSkeleton />;
    }

    if (!order) { // Not found after loading
        notFound();
    }
    
    const currentStepIndex = trackingSteps.findIndex(step => step.status === order.status);
    
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Order #{order.id.slice(-6)} &bull; Placed on {format(new Date(order.date), "PPP")}
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="mb-8">
                         <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>
                         <div className="flex justify-between items-start">
                           {trackingSteps.map((step, index) => (
                             <div key={step.name} className="flex-1 flex flex-col items-center relative">
                               <div className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2", index <= currentStepIndex ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border")}>
                                 <step.icon className="w-5 h-5"/>
                               </div>
                               <p className="text-xs text-center mt-2 font-medium">{step.name}</p>
                               {index < trackingSteps.length -1 && <div className={cn("absolute top-5 left-1/2 w-full h-0.5", index < currentStepIndex ? "bg-primary" : "bg-border")}></div>}
                             </div>
                           ))}
                         </div>
                    </div>
                    <Separator className="my-8" />
                    <ul className="divide-y">
                        {order.items.map(item => (
                            <li key={item.id} className="flex items-center py-4">
                                <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-md object-cover" />
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                    <CardContent>
                        <p>{order.shippingAddress.line1}, {order.shippingAddress.city}</p>
                        <p>{order.shippingAddress.state}, {order.shippingAddress.zip}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between"><span>Subtotal</span><span>${order.total.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
                        <Separator/>
                        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
