import { cn } from "@/lib/utils";

const palette = [
  "bg-brand-100 text-brand-700",
  "bg-success-50 text-success-600",
  "bg-warning-50 text-warning-600",
  "bg-info-50 text-info-500",
  "bg-danger-50 text-danger-600",
];

function hashIndex(input: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) % 997;
  return h % mod;
}

export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-16 h-16 text-lg", xl: "w-24 h-24 text-2xl" };
  const colorClass = palette[hashIndex(initials, palette.length)];
  return (
    <div
      className={cn(
        "shrink-0 rounded-full flex items-center justify-center font-semibold",
        sizes[size],
        colorClass,
        className,
      )}
    >
      {initials}
    </div>
  );
}
