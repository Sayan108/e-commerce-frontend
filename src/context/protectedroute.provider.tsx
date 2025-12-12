"use client";

import useAuth from "@/hooks/useAuth";
import { isProtectedRoute } from "@/lib/utils/constants";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const isProtected = isProtectedRoute(pathname);

    if (!isAuthenticated && isProtected) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;
