"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  delay?: number; // debounce delay (ms)
}

export default function Searchbar({
  placeholder = "Search",
  onSearch,
  delay = 400,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);

  function handleKeydown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      onSearch(debounced)
    }
  }

  // 🔁 debounce effect
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(query), delay);
    return () => clearTimeout(handler);
  }, [query, delay]);

  // 🔍 trigger search when debounced value changes
  useEffect(() => {
    onSearch(debounced)
    //@ts-nocheck
  }, [debounced]);

  return (
    <div className="flex items-center gap-2 w-full max-w-2xl p-2 rounded-xl shadow-sm border">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-foreground w-4 h-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeydown}
          className="pl-10 border-none focus-visible:ring-0"
        />

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setQuery("")}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
