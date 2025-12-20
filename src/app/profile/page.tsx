"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, updateUser, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  /* ---------------- POPULATE USER DATA ---------------- */
  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
    }
  }, [user]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    updateUser({
      name,
      email,
      phone,
    });

    setPassword("");
  };

  /* ---------------- LOADING STATE ---------------- */
  if (!user) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>

          <CardContent className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full" />
              </div>
            ))}
            <Skeleton className="h-11 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <Card className="border-0 sm:border">
        <CardHeader className="px-4 pt-6 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl">
            Personal Information
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            View and update your account details
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 py-6 sm:p-6">
          <form onSubmit={handleUpdate} className="space-y-5 sm:space-y-4">
            {/* FULL NAME */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                className="h-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* PHONE */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                className="h-11"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep unchanged"
              />
            </div>

            {/* CTA */}
            <Button
              type="submit"
              className="mt-6 h-11 w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
