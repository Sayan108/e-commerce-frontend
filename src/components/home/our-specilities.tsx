"use client";

import { ShieldCheck, Zap, Package, Leaf, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function OurSpecialitiesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Our Specialities
          </h2>
          <p className="mt-2 text-muted-foreground">
            What makes us different and better
          </p>
        </div>

        {/* GRID */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">
                Fast & Smooth Experience
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Optimized browsing and checkout for speed and simplicity.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Secure & Trusted</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Built with secure payments and strong data protection.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <Package className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Careful Packaging</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Orders packed safely to reach you in perfect condition.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Customer First</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Transparent policies and responsive customer support.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Quality Assured</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Only high-quality, carefully curated products.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <Leaf className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">
                Sustainable Choices
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Eco-friendly practices wherever possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
