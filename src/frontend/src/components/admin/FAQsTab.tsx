import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "../../backend.d.ts";
import { useDeleteFAQ, useFAQs, useSetFAQ } from "../../hooks/useQueries";

const EMPTY: FAQ = { id: 0n, question: "", answer: "", order: 0n };

function FAQForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: FAQ;
  onSave: (f: FAQ) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FAQ>(initial);

  return (
    <div className="bg-muted/30 rounded-xl p-5 border border-border space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <Label className="font-body text-sm">Question</Label>
          <Input
            value={form.question}
            onChange={(e) =>
              setForm((p) => ({ ...p, question: e.target.value }))
            }
            placeholder="FAQ question…"
            className="font-body text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-sm">Order</Label>
          <Input
            type="number"
            value={String(form.order)}
            onChange={(e) =>
              setForm((p) => ({ ...p, order: BigInt(e.target.value || "0") }))
            }
            placeholder="0"
            className="font-body text-sm"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="font-body text-sm">Answer</Label>
        <textarea
          value={form.answer}
          onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
          rows={3}
          placeholder="FAQ answer…"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
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
          data-ocid="admin-save-faq"
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

export function FAQsTab() {
  const { data: faqs, isLoading } = useFAQs();
  const setFAQ = useSetFAQ();
  const deleteFAQ = useDeleteFAQ();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const sorted = [...(faqs ?? [])].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  const handleSave = async (f: FAQ) => {
    await setFAQ.mutateAsync(f);
    setEditingId(null);
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground font-body">
          {faqs?.length ?? 0} FAQ{(faqs?.length ?? 0) !== 1 ? "s" : ""}
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
          data-ocid="admin-add-faq"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
      </div>

      {adding && (
        <FAQForm
          initial={EMPTY}
          onSave={handleSave}
          onCancel={() => setAdding(false)}
          saving={setFAQ.isPending}
        />
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      )}

      <div className="space-y-3">
        {sorted.map((faq) => (
          <div
            key={String(faq.id)}
            className="bg-card rounded-xl border border-border p-4"
            data-ocid="admin-faq-row"
          >
            {editingId === String(faq.id) ? (
              <FAQForm
                initial={faq}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
                saving={setFAQ.isPending}
              />
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-body text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      #{String(faq.order)}
                    </span>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {faq.question}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">
                    {faq.answer}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(String(faq.id))}
                    className="gap-1 font-body"
                    data-ocid="admin-edit-faq"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteFAQ.mutate(faq.id)}
                    className="gap-1 font-body text-destructive hover:text-destructive"
                    data-ocid="admin-delete-faq"
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
