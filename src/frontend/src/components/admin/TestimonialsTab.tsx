import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Testimonial } from "../../backend.d.ts";
import {
  useDeleteTestimonial,
  useSetTestimonial,
  useTestimonials,
} from "../../hooks/useQueries";

const EMPTY: Testimonial = {
  id: 0n,
  studentName: "",
  qualification: "",
  text: "",
  rating: 5n,
  isVisible: true,
};

function StarRating({
  value,
  onChange,
}: {
  value: bigint;
  onChange: (v: bigint) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange(BigInt(n))}
          className="focus-visible:outline-none"
          aria-label={`${n} stars`}
        >
          <Star
            className={`w-5 h-5 transition-colors ${Number(value) >= n ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        </button>
      ))}
    </div>
  );
}

function TestimonialForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Testimonial;
  onSave: (t: Testimonial) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Testimonial>(initial);
  const set = <K extends keyof Testimonial>(key: K, value: Testimonial[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-muted/30 rounded-xl p-5 border border-border space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="font-body text-sm">Student Name</Label>
          <Input
            value={form.studentName}
            onChange={(e) => set("studentName", e.target.value)}
            placeholder="Name"
            className="font-body text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-sm">Qualification</Label>
          <Input
            value={form.qualification}
            onChange={(e) => set("qualification", e.target.value)}
            placeholder="e.g. CA Final"
            className="font-body text-sm"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="font-body text-sm">Testimonial Text</Label>
        <textarea
          value={form.text}
          onChange={(e) => set("text", e.target.value)}
          rows={3}
          placeholder="Testimonial text…"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="space-y-1.5">
          <Label className="font-body text-sm">Rating</Label>
          <StarRating value={form.rating} onChange={(v) => set("rating", v)} />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Switch
            checked={form.isVisible}
            onCheckedChange={(v) => set("isVisible", v)}
            id="visible-toggle"
            data-ocid="admin-testimonial-visible"
          />
          <Label htmlFor="visible-toggle" className="font-body text-sm">
            Visible on site
          </Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => onSave(form)}
          disabled={saving}
          className="font-body text-primary-foreground"
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
          }}
          data-ocid="admin-save-testimonial"
        >
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="font-body"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export function TestimonialsTab() {
  const { data: testimonials, isLoading } = useTestimonials();
  const setTestimonial = useSetTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSave = async (t: Testimonial) => {
    await setTestimonial.mutateAsync(t);
    setEditingId(null);
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground font-body">
          {testimonials?.length ?? 0} testimonials
        </p>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setAdding(true);
            setEditingId(null);
          }}
          className="gap-1.5 font-body text-primary-foreground"
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
          }}
          data-ocid="admin-add-testimonial"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      {adding && (
        <TestimonialForm
          initial={EMPTY}
          onSave={handleSave}
          onCancel={() => setAdding(false)}
          saving={setTestimonial.isPending}
        />
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      )}

      <div className="space-y-3">
        {testimonials?.map((t) => (
          <div
            key={String(t.id)}
            className="bg-card rounded-xl border border-border p-4"
            data-ocid="admin-testimonial-row"
          >
            {editingId === String(t.id) ? (
              <TestimonialForm
                initial={t}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
                saving={setTestimonial.isPending}
              />
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-semibold text-foreground text-sm">
                      {t.studentName}
                    </p>
                    {!t.isVisible && (
                      <span className="text-xs font-body text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    {t.qualification}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: Number(t.rating) }, (_, i) => (
                      <Star
                        key={`star-${String(t.id)}-${i}`}
                        className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">
                    {t.text}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(String(t.id))}
                    className="gap-1 font-body"
                    data-ocid="admin-edit-testimonial"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTestimonial.mutate(t.id)}
                    className="gap-1 font-body text-destructive hover:text-destructive"
                    data-ocid="admin-delete-testimonial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
