import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import OptimizedImage from "./errorHandledImage";
import Image from "next/image";
import clsx from "clsx";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="BoutiqueBlast Home"
    >
      <span className="text-xl font-bold tracking-tight font-headline text-foreground">
        BoutiqueBlast
      </span>
    </Link>
  );
}
