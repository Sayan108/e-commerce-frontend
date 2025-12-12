"use client";

import { setNavigator } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Set global navigator function
    setNavigator((path: string) => {
      router.push(path);
    });
  }, [router]);

  return <>{children}</>;
}
