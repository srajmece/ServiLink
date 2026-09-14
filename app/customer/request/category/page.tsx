"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { categories, getCategory } from "@/lib/data/categories";
import { useBookingDraft } from "@/lib/bookingDraft";
import { StepProgress, Chip, SectionHeader } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";

function CategoryStepInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { draft, update } = useBookingDraft();
  const [categoryId, setCategoryId] = useState<string | null>(() => draft.categoryId ?? params.get("category"));
  const [problemId, setProblemId] = useState<string | null>(draft.problemId);

  const category = categoryId ? getCategory(categoryId) : null;
  const problems = category?.subcategories.flatMap((s) => s.problems) ?? [];

  function handleContinue() {
    if (!categoryId || !problemId) return;
    const problem = problems.find((p) => p.id === problemId);
    update({
      categoryId,
      problemId,
      problemLabel: problem?.label ?? "",
      requiredSkills: problem?.requiredSkills ?? [],
    });
    router.push("/customer/request/describe");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <StepProgress step={1} total={4} />
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mt-4">What service do you need?</h1>
      <p className="text-foreground/55 text-sm mt-1">Choose a category, then tell us the specific problem.</p>

      <SectionHeader title="Category" className="mt-6 mb-3" />
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCategoryId(c.id);
              setProblemId(null);
            }}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-colors ${
              categoryId === c.id ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted"
            }`}
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="text-[11px] font-medium leading-tight">{c.name}</span>
          </button>
        ))}
      </div>

      {category && (
        <div className="mt-8">
          <SectionHeader title={`What's the issue with ${category.name.toLowerCase()}?`} className="mb-3" />
          <div className="grid sm:grid-cols-2 gap-2.5">
            {problems.map((p) => (
              <Chip key={p.id} selected={problemId === p.id} onClick={() => setProblemId(p.id)}>
                {p.label}
              </Chip>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Button fullWidth size="lg" disabled={!categoryId || !problemId} onClick={handleContinue}>
          Continue <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}

export default function CategoryStep() {
  return (
    <Suspense>
      <CategoryStepInner />
    </Suspense>
  );
}
