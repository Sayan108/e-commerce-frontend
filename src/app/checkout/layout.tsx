"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

const steps = [
  { id: "01", name: "Address", href: "/checkout/address" },
  { id: "02", name: "Payment", href: "/checkout/payment" },
  { id: "03", name: "Summary", href: "/checkout/summary" },
];

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* COMPACT STICKY HEADER */}
      <header className="sticky top-0 z-30 bg-background border-b">
        <div className="py-4">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, stepIdx) => {
                const isCompleted = currentStepIndex > stepIdx;
                const isCurrent = currentStepIndex === stepIdx;

                return (
                  <li key={step.name} className="flex flex-1 items-center">
                    <div className="flex items-center gap-3">
                      {/* CIRCLE */}
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : isCurrent
                            ? "border-2 border-primary text-primary"
                            : "border border-border text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                      </span>

                      {/* LABEL */}
                      <span
                        className={`text-sm font-medium ${
                          isCompleted || isCurrent
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>

                    {/* CONNECTOR */}
                    {stepIdx < steps.length - 1 && (
                      <div className="mx-4 h-px flex-1 bg-border" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="py-6">{children}</main>
    </div>
  );
}
