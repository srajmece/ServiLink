import { ProviderShell } from "@/components/layout/ProviderShell";

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return <ProviderShell>{children}</ProviderShell>;
}
