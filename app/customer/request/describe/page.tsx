"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Camera, Video, Mic, X, Square } from "lucide-react";
import { useBookingDraft } from "@/lib/bookingDraft";
import { getCategory } from "@/lib/data/categories";
import { StepProgress } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";

export default function DescribeStep() {
  const router = useRouter();
  const { draft, update } = useBookingDraft();
  const [description, setDescription] = useState(draft.description);
  const [attachments, setAttachments] = useState<string[]>(draft.attachments);
  const [voiceNoteAdded, setVoiceNoteAdded] = useState(draft.voiceNoteAdded);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!draft.categoryId || !draft.problemId) router.replace("/customer/request/category");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const category = draft.categoryId ? getCategory(draft.categoryId) : null;

  function handleFiles(files: FileList | null) {
    if (!files) return;
    setAttachments((prev) => [...prev, ...Array.from(files).map((f) => f.name)]);
  }

  function handleContinue() {
    update({ description, attachments, voiceNoteAdded });
    router.push("/customer/request/location");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <StepProgress step={2} total={4} />
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mt-4">Describe the problem</h1>
      <p className="text-foreground/55 text-sm mt-1">The more detail you give, the better we can match you.</p>

      {category && draft.problemLabel && (
        <div className="mt-5 rounded-2xl border border-border bg-surface-muted/60 p-4 flex items-center gap-3">
          <span className="text-2xl">{category.emoji}</span>
          <div>
            <p className="text-xs text-foreground/50">{category.name}</p>
            <p className="font-medium text-sm">{draft.problemLabel}</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <label className="text-sm font-medium">Tell us more (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="e.g. The power went out in the kitchen and hall this morning, other rooms are fine."
          className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-3 text-sm outline-none focus:border-brand-500 resize-none"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium mb-2">Add photos or a video (optional)</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => fileInput.current?.click()}
            className="flex items-center gap-1.5 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-foreground/60 hover:bg-surface-muted"
          >
            <Camera size={16} /> Photo
          </button>
          <button
            onClick={() => fileInput.current?.click()}
            className="flex items-center gap-1.5 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-foreground/60 hover:bg-surface-muted"
          >
            <Video size={16} /> Video
          </button>
          <button
            onClick={() => setVoiceNoteAdded((v) => !v)}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium ${
              voiceNoteAdded ? "border-danger-500 bg-danger-50 text-danger-600" : "border-dashed border-border text-foreground/60 hover:bg-surface-muted"
            }`}
          >
            {voiceNoteAdded ? <Square size={14} className="fill-danger-600" /> : <Mic size={16} />}
            {voiceNoteAdded ? "Voice note added" : "Record voice note"}
          </button>
          <input ref={fileInput} type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>
        {attachments.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {attachments.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-surface-muted rounded-full pl-3 pr-1.5 py-1">
                {a}
                <button onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="p-0.5 rounded-full hover:bg-border">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <Button fullWidth size="lg" onClick={handleContinue}>
          Continue <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
