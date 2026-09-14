import Link from "next/link";
import { ServiceCategory } from "@/lib/types";

export function CategoryCard({ category }: { category: ServiceCategory }) {
  return (
    <Link
      href={`/customer/request/category?category=${category.id}`}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
    >
      <span className="text-3xl">{category.emoji}</span>
      <div>
        <p className="font-semibold text-sm sm:text-base">{category.name}</p>
        <p className="text-xs sm:text-sm text-foreground/55 mt-0.5 line-clamp-2">{category.description}</p>
      </div>
    </Link>
  );
}
