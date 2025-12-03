'use client';
import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';

const steps = [
    { id: '01', name: 'Address', href: '/checkout/address' },
    { id: '02', name: 'Payment', href: '/checkout/payment' },
    { id: '03', name: 'Summary', href: '/checkout/summary' },
];

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const currentStepIndex = steps.findIndex(step => pathname.startsWith(step.href));

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight font-headline text-center">Checkout</h1>
                <nav aria-label="Progress" className="mt-8">
                    <ol role="list" className="flex items-center justify-center">
                        {steps.map((step, stepIdx) => (
                            <li key={step.name} className="relative flex-1">
                                {stepIdx < steps.length - 1 ? (
                                    <div className="absolute inset-0 top-4 -ml-px h-0.5 w-full bg-border" aria-hidden="true" />
                                ) : null}
                                <div className="relative flex items-center justify-center">
                                    {currentStepIndex > stepIdx ? (
                                        <div className="flex flex-col items-center">
                                            <span className="flex h-9 items-center">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </span>
                                            <span className="text-sm font-medium text-primary mt-2">{step.name}</span>
                                        </div>
                                    ) : currentStepIndex === stepIdx ? (
                                         <div className="flex flex-col items-center">
                                            <span className="flex h-9 items-center">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                                                    <span className="text-primary">{step.id}</span>
                                                </span>
                                            </span>
                                            <span className="text-sm font-medium text-primary mt-2">{step.name}</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className="flex h-9 items-center">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background">
                                                    <span className="text-muted-foreground">{step.id}</span>
                                                </span>
                                            </span>
                                            <span className="text-sm font-medium text-muted-foreground mt-2">{step.name}</span>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}
