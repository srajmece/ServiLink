"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Building2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Intent = "customer" | "provider";
type AccountType = "individual" | "business";

export default function RegisterPage() {
  const router = useRouter();
  const [intent, setIntent] = useState<Intent>("customer");
  const [accountType, setAccountType] = useState<AccountType>("individual");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(intent === "customer" ? "/customer" : "/provider/onboarding");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:py-20">
      <h1 className="text-2xl font-semibold tracking-tight text-center">Create your account</h1>
      <p className="text-center text-foreground/55 mt-1.5 text-sm">Demo prototype — no real account is created.</p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          onClick={() => setIntent("customer")}
          className={cn(
            "rounded-2xl border p-4 text-left transition-colors",
            intent === "customer" ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
          )}
        >
          <User size={20} className="text-brand-700 mb-2" />
          <p className="font-semibold text-sm">I need a service</p>
          <p className="text-xs text-foreground/55 mt-0.5">Book verified professionals</p>
        </button>
        <button
          onClick={() => setIntent("provider")}
          className={cn(
            "rounded-2xl border p-4 text-left transition-colors",
            intent === "provider" ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
          )}
        >
          <Wrench size={20} className="text-brand-700 mb-2" />
          <p className="font-semibold text-sm">I provide a service</p>
          <p className="text-xs text-foreground/55 mt-0.5">Get matched with jobs</p>
        </button>
      </div>

      {intent === "customer" && (
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Account type</p>
          <div className="flex rounded-xl bg-surface-muted p-1">
            {(["individual", "business"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setAccountType(t)}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-colors inline-flex items-center justify-center gap-1.5",
                  accountType === t ? "bg-surface shadow-sm" : "text-foreground/55",
                )}
              >
                {t === "business" && <Building2 size={14} />}
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <Card className="mt-6 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">{accountType === "business" && intent === "customer" ? "Business name" : "Full name"}</label>
            <input
              defaultValue={accountType === "business" && intent === "customer" ? "Greenfield Apartments Association" : "Your name"}
              className="mt-1.5 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Mobile number</label>
            <input
              defaultValue="98400 00000"
              className="mt-1.5 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              defaultValue="you@example.com"
              className="mt-1.5 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <Button type="submit" fullWidth size="lg">
            {intent === "customer" ? "Create account" : "Continue to provider onboarding"}
          </Button>
        </form>
      </Card>

      <p className="text-center text-sm text-foreground/55 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-700 font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
