"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CircleUserRound,
  Menu,
  Search,
  ShoppingCart,
  Home,
  Grid2x2,
  Phone,
  User,
  Package,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import { Logo } from "../shared/logo";
import { SearchDialog } from "../shared/search-dialog";
import { SearchBar } from "../shared/search-bar";

import { useIsMobile } from "@/hooks/use-mobile";
import useAuth from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/categories", label: "Categories", icon: Grid2x2 },
  { href: "/contact", label: "Contact Us", icon: Phone },
];

export function Header() {
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    isAuthenticated,
    logOut,
    user: { cartItemCount: cartCount = 0 },
  } = useAuth();

  /* ---------------- USER MENU (DESKTOP) ---------------- */

  const userMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/profile/orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logOut}
              className="flex items-center gap-2 text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  /* ---------------- DESKTOP NAV ---------------- */

  const desktopNav = (
    <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-8">
      <Logo />

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="w-full max-w-sm">
          <SearchBar />
        </div>

        {userMenu}

        <Link href={isAuthenticated ? "/cart" : "/login"}>
          <Button variant="ghost" size="icon">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {cartCount}
                </Badge>
              )}
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );

  /* ---------------- MOBILE NAV ---------------- */

  const mobileNav = (
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Logo />

      <div className="flex items-center gap-2">
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </SearchDialog>

        <Link href="/cart">
          <Button variant="ghost" size="icon">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {cartCount}
                </Badge>
              )}
            </div>
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <nav className="grid gap-4 text-base font-medium mt-10">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}

              <DropdownMenuSeparator />

              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    Profile
                  </Link>

                  <Link
                    href="/profile/orders"
                    className="flex items-center gap-3"
                  >
                    <Package className="h-5 w-5" />
                    Orders
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={logOut}
                    className="flex items-center gap-3 justify-start text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center gap-3">
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>

                  <Link href="/register" className="flex items-center gap-3">
                    <UserPlus className="h-5 w-5" />
                    Register
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );

  /* ---------------- ROOT ---------------- */

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {isMobile ? mobileNav : desktopNav}
    </header>
  );
}
