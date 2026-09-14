"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { SectionHeader } from "@/components/ui/Misc";

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const filtered = categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">All Services</h1>
        <p className="text-foreground/60 mt-2">
          From home repairs to industrial maintenance — browse every category on the ServiLink network.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-surface p-2 shadow-sm max-w-md mx-auto">
          <Search size={18} className="text-foreground/40 ml-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="flex-1 bg-transparent outline-none text-sm py-2"
          />
        </div>
      </div>

      <SectionHeader title={`${filtered.length} categories`} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </div>
  );
}
