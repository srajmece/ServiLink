"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"customer" | "provider">("customer");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(role === "customer" ? "/customer" : "/provider");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:py-20">
      <h1 className="text-2xl font-semibold tracking-tight text-center">Log in to ServiLink</h1>
      <p className="text-center text-foreground/55 mt-1.5 text-sm">Demo prototype — any details will log you in.</p>

      <div className="mt-8 flex rounded-xl bg-surface-muted p-1">
        {(["customer", "provider"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-colors",
              role === r ? "bg-surface shadow-sm" : "text-foreground/55",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Mobile number</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5">
              <Phone size={16} className="text-foreground/40" />
              <input type="tel" placeholder="98400 12345" defaultValue="98400 12345" className="flex-1 bg-transparent outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5">
              <Lock size={16} className="text-foreground/40" />
              <input type="password" placeholder="••••••••" defaultValue="demo1234" className="flex-1 bg-transparent outline-none text-sm" />
            </div>
          </div>
          <Button type="submit" fullWidth size="lg">
            Log in as {role === "customer" ? "Customer" : "Provider"}
          </Button>
        </form>
      </Card>

      <p className="text-center text-sm text-foreground/55 mt-6">
        New to ServiLink?{" "}
        <Link href="/register" className="text-brand-700 font-medium">
          Create an account
        </Link>
      </p>
      <p className="text-center text-xs text-foreground/40 mt-2">
        Platform administrator?{" "}
        <Link href="/admin/login" className="text-foreground/60 underline">
          Admin login
        </Link>
      </p>
    </div>
  );
}
