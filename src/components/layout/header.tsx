"use client";

import Link from "next/link";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
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

import { Logo } from "../shared/logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "../ui/badge";
import { SearchDialog } from "../shared/search-dialog";
import { useState } from "react";
import { SearchBar } from "../shared/search-bar";
import useProducts from "@/hooks/useProducts";
import useAuth from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    isAuthenticated,
    logOut,
    user: { cartItemCount: cartCount = 0 },
  } = useAuth();

  const userMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>Logout</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">Register</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const desktopNav = (
    <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-8">
      <Logo />
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="w-full max-w-sm">
          <SearchBar />
        </div>
        {userMenu}
        <Link href={isAuthenticated ? "/cart" : "/login"} passHref>
          <Button variant="ghost" size="icon" asChild>
            <div className="relative">
              <ShoppingCart />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );

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
            <Search />
            <span className="sr-only">Search</span>
          </Button>
        </SearchDialog>
        <Link href="/cart" passHref>
          <Button variant="ghost" size="icon" asChild>
            <div className="relative">
              <ShoppingCart />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </div>
          </Button>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <DropdownMenuSeparator />
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="transition-colors hover:text-primary"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="transition-colors hover:text-primary"
                  >
                    Orders
                  </Link>
                  <Button
                    onClick={() => logOut()}
                    className="transition-colors hover:text-primary cursor-pointer"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="transition-colors hover:text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="transition-colors hover:text-primary"
                  >
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {isMobile ? mobileNav : desktopNav}
    </header>
  );
}
