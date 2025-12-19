import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "../shared/logo";
import { Separator } from "../ui/separator";

/* ICONS */
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
  </svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* TOP GRID */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* BRAND */}
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              An elegant online boutique with a blast of style.
            </p>

            <div className="mt-4 flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* SHOP */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/categories" className="hover:text-primary">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/#featured" className="hover:text-primary">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/#new-arrivals" className="hover:text-primary">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-primary">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get updates on sales, new releases & exclusive offers.
            </p>

            <form className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button type="submit" className="sm:w-auto w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} BoutiqueBlast India</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
