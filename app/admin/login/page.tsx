"use client";

import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/layout/Logo";

export default function AdminLoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted/60 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo href="/" />
        </div>
        <Card className="p-6">
          <div className="flex items-center gap-2 justify-center mb-1">
            <ShieldCheck size={18} className="text-brand-600" />
            <h1 className="text-lg font-semibold">Admin Console Login</h1>
          </div>
          <p className="text-center text-xs text-foreground/50 mb-6">Restricted to authorized platform operators.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Admin email</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5">
                <Mail size={16} className="text-foreground/40" />
                <input type="email" defaultValue="admin@servilink.example" className="flex-1 bg-transparent outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5">
                <Lock size={16} className="text-foreground/40" />
                <input type="password" defaultValue="admin1234" className="flex-1 bg-transparent outline-none text-sm" />
              </div>
            </div>
            <Button type="submit" fullWidth size="lg">Log in to Admin Console</Button>
          </form>
        </Card>
        <p className="text-center text-xs text-foreground/40 mt-4">Demo prototype — any details will log you in.</p>
      </div>
    </div>
  );
}
