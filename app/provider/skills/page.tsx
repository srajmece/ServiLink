"use client";

import { useState } from "react";
import { X, Plus, Upload, FileCheck2 } from "lucide-react";
import { getProvider } from "@/lib/data/providers";
import { categories } from "@/lib/data/categories";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip, SectionHeader } from "@/components/ui/Misc";

const CURRENT_PROVIDER_ID = "p1";

export default function ProviderSkillsPage() {
  const provider = getProvider(CURRENT_PROVIDER_ID)!;
  const [skills, setSkills] = useState(provider.skills);
  const [newSkill, setNewSkill] = useState("");
  const [categoryIds, setCategoryIds] = useState(provider.categories);

  function addSkill() {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((s) => [...s, newSkill.trim()]);
      setNewSkill("");
    }
  }

  function toggleCategory(id: string) {
    setCategoryIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Skills & Certificates</h1>
        <p className="text-foreground/55 text-sm mt-1">Keep your technical profile accurate to get better job matches.</p>
      </div>

      <Card className="p-5">
        <SectionHeader title="Service categories" className="mb-3" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((c) => (
            <Chip key={c.id} selected={categoryIds.includes(c.id)} onClick={() => toggleCategory(c.id)}>
              {c.emoji} {c.name}
            </Chip>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader title="Skills" className="mb-3" />
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 text-xs font-medium bg-brand-50 text-brand-700 rounded-full pl-3 pr-1.5 py-1.5">
              {s}
              <button onClick={() => setSkills((prev) => prev.filter((x) => x !== s))} className="p-0.5 rounded-full hover:bg-brand-100">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            placeholder="Add a skill, e.g. Control Panels"
            className="flex-1 rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <Button variant="outline" onClick={addSkill}><Plus size={15} /> Add</Button>
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader
          title="Certifications"
          action={<Button size="sm" variant="outline"><Upload size={13} /> Upload new</Button>}
          className="mb-3"
        />
        <div className="space-y-2">
          {provider.certifications.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-xl border border-border p-3.5">
              <div className="flex items-center gap-3">
                <FileCheck2 size={16} className="text-brand-600" />
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-foreground/50">{c.issuer} · {c.year} · {c.fileName}</p>
                </div>
              </div>
              <Badge tone={c.status === "verified" ? "success" : c.status === "rejected" ? "danger" : "warning"}>{c.status}</Badge>
            </div>
          ))}
          {provider.certifications.length === 0 && <p className="text-sm text-foreground/50">No certificates uploaded yet.</p>}
        </div>
      </Card>

      <Button size="lg" fullWidth>Save changes</Button>
    </div>
  );
}
