import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <Logo />
          <p className="text-sm text-foreground/55 mt-3">
            A digital skilled-service network connecting customers and businesses with verified professionals.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold mb-3">Customers</p>
          <ul className="space-y-2 text-sm text-foreground/60">
            <li><Link href="/services">Browse services</Link></li>
            <li><Link href="/customer/emergency">Emergency service</Link></li>
            <li><Link href="/register">Create account</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold mb-3">Providers</p>
          <ul className="space-y-2 text-sm text-foreground/60">
            <li><Link href="/provider/onboarding">Join as a provider</Link></li>
            <li><Link href="/provider/verification">Verification centre</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-sm text-foreground/60">
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/admin/login">Admin login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-foreground/45">
        © 2026 ServiLink. Prototype product — all data shown is fictional demo data.
      </div>
    </footer>
  );
}
