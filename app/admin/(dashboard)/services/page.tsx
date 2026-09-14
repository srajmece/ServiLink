"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { providers } from "@/lib/data/providers";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatCurrency } from "@/lib/utils";

const tabs = [
  { key: "categories", label: "Categories" },
  { key: "subcategories", label: "Subcategories" },
  { key: "skills", label: "Skills" },
  { key: "pricing", label: "Pricing" },
] as const;

function ServicesInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>((params.get("tab") as never) ?? "categories");

  const allSkills = useMemo(() => {
    const set = new Map<string, number>();
    providers.forEach((p) => p.skills.forEach((s) => set.set(s, (set.get(s) ?? 0) + 1)));
    return Array.from(set.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const pricing = categories.filter((c) => c.subcategories[0]?.problems.length).map((c) => ({
    category: c,
    min: Math.min(...providers.filter((p) => p.categories.includes(c.id)).map((p) => p.startingPrice), 199),
    avg:
      Math.round(
        providers.filter((p) => p.categories.includes(c.id)).reduce((sum, p) => sum + p.startingPrice, 0) /
          Math.max(1, providers.filter((p) => p.categories.includes(c.id)).length),
      ) || 0,
  }));

  return (
    <div className="space-y-5">
      <SectionHeader title="Service Management" action={<Button size="sm"><Plus size={14} /> Add new</Button>} />

      <div className="flex rounded-xl bg-surface-muted p-1 max-w-xl overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn("shrink-0 px-4 py-2 rounded-lg text-sm font-medium", tab === t.key ? "bg-surface shadow-sm" : "text-foreground/55")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "categories" && (
        <Table>
          <THead>
            <tr>
              <TH>Category</TH>
              <TH>Description</TH>
              <TH>Subcategories</TH>
              <TH>Featured</TH>
              <TH>Active providers</TH>
            </tr>
          </THead>
          <TBody>
            {categories.map((c) => (
              <TR key={c.id}>
                <TD className="font-medium">{c.emoji} {c.name}</TD>
                <TD className="text-foreground/60 max-w-[280px]">{c.description}</TD>
                <TD>{c.subcategories.length}</TD>
                <TD>{c.featured ? <Badge tone="success">Featured</Badge> : <Badge tone="neutral">Hidden</Badge>}</TD>
                <TD>{providers.filter((p) => p.categories.includes(c.id)).length}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}

      {tab === "subcategories" && (
        <Table>
          <THead>
            <tr>
              <TH>Category</TH>
              <TH>Subcategory</TH>
              <TH>Problem types</TH>
            </tr>
          </THead>
          <TBody>
            {categories.flatMap((c) =>
              c.subcategories.map((s) => (
                <TR key={s.id}>
                  <TD className="font-medium">{c.emoji} {c.name}</TD>
                  <TD>{s.name}</TD>
                  <TD className="text-foreground/60">{s.problems.map((p) => p.label).join(", ")}</TD>
                </TR>
              )),
            )}
          </TBody>
        </Table>
      )}

      {tab === "skills" && (
        <Table>
          <THead>
            <tr>
              <TH>Skill</TH>
              <TH>Providers with this skill</TH>
            </tr>
          </THead>
          <TBody>
            {allSkills.map(([skill, count]) => (
              <TR key={skill}>
                <TD className="font-medium">{skill}</TD>
                <TD>{count}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}

      {tab === "pricing" && (
        <Table>
          <THead>
            <tr>
              <TH>Category</TH>
              <TH>Minimum starting price</TH>
              <TH>Average starting price</TH>
            </tr>
          </THead>
          <TBody>
            {pricing.map((p) => (
              <TR key={p.category.id}>
                <TD className="font-medium">{p.category.emoji} {p.category.name}</TD>
                <TD>{formatCurrency(p.min)}</TD>
                <TD>{formatCurrency(p.avg)}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}

export default function AdminServicesPage() {
  return (
    <Suspense>
      <ServicesInner />
    </Suspense>
  );
}
