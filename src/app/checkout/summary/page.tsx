'use client';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Address } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function SummaryPage() {
    const { user, addOrder } = useAuth();
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    const [selectedAddressId] = useLocalStorage<string | undefined>('selectedAddress', undefined);
    const [paymentMethod] = useLocalStorage<'Online' | 'COD' | undefined>('paymentMethod', undefined);
    const [shippingAddress, setShippingAddress] = useState<Address | null>(null);

    useEffect(() => {
        if (!user || !selectedAddressId || !paymentMethod) {
            router.push('/checkout/address');
            return;
        }
        const address = user.addresses.find(a => a.id === selectedAddressId);
        if (address) {
            setShippingAddress(address);
        } else {
            router.push('/checkout/address');
        }
    }, [user, selectedAddressId, paymentMethod, router]);

    const handlePlaceOrder = () => {
        if (!shippingAddress || !paymentMethod) return;

        const orderId = addOrder({
            items: cartItems,
            total: cartTotal,
            shippingAddress,
            paymentMethod,
            status: 'Pending',
        });
        
        if (orderId) {
            clearCart();
            localStorage.removeItem('selectedAddress');
            localStorage.removeItem('paymentMethod');
            toast({
                title: 'Order Placed!',
                description: 'Thank you for your purchase. Your order is being processed.',
            });
            router.push(`/profile/orders/${orderId}`);
        } else {
            toast({
                title: 'Order Failed',
                description: 'There was an issue placing your order. Please try again.',
                variant: 'destructive',
            });
        }
    };

    if (!shippingAddress || !paymentMethod) {
        return <div>Loading summary...</div>;
    }

    return (
        <div className="mx-auto max-w-4xl grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="divide-y">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex items-center py-4">
                                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" />
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
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>Shipping To</CardTitle></CardHeader>
                    <CardContent>
                        <p>{shippingAddress.line1}, {shippingAddress.city}</p>
                        <p>{shippingAddress.state}, {shippingAddress.zip}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
                    <CardContent><p>{paymentMethod}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
                    </CardContent>
                </Card>
                <Button onClick={handlePlaceOrder} size="lg" className="w-full">
                    Place Order
                </Button>
                <Button variant="outline" onClick={() => router.back()} className="w-full">Back</Button>
            </div>
        </div>
    );
}
