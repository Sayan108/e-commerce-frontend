'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CreditCard, Truck } from 'lucide-react';

export default function PaymentPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useLocalStorage<'Online' | 'COD' | undefined>('paymentMethod', undefined);

    return (
        <div className="mx-auto max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={(val) => setPaymentMethod(val as 'Online' | 'COD')}>
                        <Label htmlFor="online" className="flex items-center space-x-4 border rounded-md p-4 has-[:checked]:bg-secondary has-[:checked]:border-primary">
                            <RadioGroupItem value="Online" id="online" />
                            <CreditCard className="h-6 w-6" />
                            <div>
                                <p className="font-semibold">Online Payment</p>
                                <p className="text-sm text-muted-foreground">Pay with credit/debit card, or other digital methods.</p>
                            </div>
                        </Label>
                        <Label htmlFor="cod" className="flex items-center space-x-4 border rounded-md p-4 has-[:checked]:bg-secondary has-[:checked]:border-primary">
                            <RadioGroupItem value="COD" id="cod" />
                            <Truck className="h-6 w-6" />
                            <div>
                                <p className="font-semibold">Cash on Delivery (COD)</p>
                                <p className="text-sm text-muted-foreground">Pay in cash when your order is delivered.</p>
                            </div>
                        </Label>
                    </RadioGroup>

                    <div className="flex gap-4">
                        <Button variant="outline" onClick={() => router.back()} className="w-full">
                            Back
                        </Button>
                        <Button
                            disabled={!paymentMethod}
                            onClick={() => router.push('/checkout/summary')}
                            className="w-full"
                            size="lg"
                        >
                            Continue to Summary
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
