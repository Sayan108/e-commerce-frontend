export const protectedRoutes = ["/cart", "/profile", "/checkout", "/profile"];

export function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export const profileFallBack = "/avatar-profile.webp";
export const productFallback = "/product.webp";
