"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  setProductFilter,
} from "@/lib/redux/slices/products.slice";
import { RootState } from "@/lib/redux";

interface SearchBarProps {}

export function SearchBar({}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const { filter } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      dispatch(setProductFilter({ search: query.trim() }));
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full items-center space-x-2"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" className="hidden md:inline-flex">
        Search
      </Button>
    </form>
  );
}
