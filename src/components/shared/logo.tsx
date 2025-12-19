import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="BoutiqueBlast Home"
      className="flex items-center gap-2 select-none"
    >
      {/* Logo Image */}
      <div className="relative h-8 w-8">
        <Image
          src="/logo.png" // 👉 put logo inside /public/logo.png
          alt="BoutiqueBlast Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Brand Text */}
      <span
        className={clsx(
          "text-xl font-bold tracking-tight",
          "font-headline text-foreground hidden sm:inline-block"
        )}
      >
        BoutiqueBlast
      </span>
    </Link>
  );
}
