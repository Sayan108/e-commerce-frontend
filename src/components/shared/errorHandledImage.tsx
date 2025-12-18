"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
  isAvatar?: boolean;
};

export default function OptimizedImage({
  src,
  alt,
  fallback,
  className,
  isAvatar = false,
}: Props) {
  const [img, setImg] = useState(src || fallback);

  // ✅ AVATAR MODE (fixed size)
  if (isAvatar) {
    return (
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src={img}
          alt={alt}
          fill
          className={clsx("rounded-full object-cover", className)}
          onError={() => setImg(fallback)}
          sizes="40px"
        />
      </div>
    );
  }

  // ✅ NORMAL IMAGE MODE (product, banner)
  return (
    <Image
      src={img}
      alt={alt}
      fill
      className={clsx("object-cover", className)}
      onError={() => setImg(fallback)}
      priority
      sizes="(max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             600px"
    />
  );
}
