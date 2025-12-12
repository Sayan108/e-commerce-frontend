export const protectedRoutes = ["/cart", "/profile", "/checkout", "/profile"];

export function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}
