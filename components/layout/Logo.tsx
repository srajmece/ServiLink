import Link from "next/link";
import { Link2 } from "lucide-react";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-semibold text-lg tracking-tight">
      <span className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
        <Link2 size={16} />
      </span>
      ServiLink
    </Link>
  );
}
