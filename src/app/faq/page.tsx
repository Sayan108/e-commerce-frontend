"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";
import useFaqs from "@/hooks/useFaqs";

export default function FAQPage() {
  const { faqs, loading } = useFaqs();

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
          {/* 🔄 Loading Skeleton */}
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border px-4 py-3 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* 📭 Empty State */}
          {!loading && faqs?.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No FAQs available at the moment.
            </div>
          )}

          {/* ✅ FAQ List */}
          {!loading && faqs?.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq: any, index: number) => (
                <AccordionItem key={faq._id || faq.id} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
