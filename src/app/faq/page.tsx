"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-3">
          <HelpCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find quick answers to common questions about orders, payments, and
          delivery.
        </p>
      </div>

      {/* FAQ CONTENT */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">General Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I place an order?</AccordionTrigger>
              <AccordionContent>
                Browse products, add them to your cart, and proceed to checkout.
                Select your address, choose a payment method, and confirm your
                order.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I change my order after placing it?
              </AccordionTrigger>
              <AccordionContent>
                Orders can only be modified before they are shipped. Please
                contact support as soon as possible for assistance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What payment methods are supported?
              </AccordionTrigger>
              <AccordionContent>
                We accept UPI, credit/debit cards, net banking, and select
                wallet payments.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How long does delivery take?</AccordionTrigger>
              <AccordionContent>
                Delivery typically takes 3–7 business days depending on your
                location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order is shipped, you’ll receive a tracking link via
                SMS or email.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                Returns are accepted within 7 days of delivery for eligible
                products. Items must be unused and in original packaging.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
