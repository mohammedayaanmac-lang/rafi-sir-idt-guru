import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Achievement } from "../../backend.d.ts";
import {
  useAchievements,
  useDeleteAchievement,
  useSetAchievement,
} from "../../hooks/useQueries";

const EMPTY: Achievement = { id: 0n, title: "", value: "", icon: "" };

function AchievementForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Achievement;
  onSave: (a: Achievement) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Achievement>(initial);
  const set = (key: keyof Achievement, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-muted/30 rounded-xl p-5 border border-border space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <Label className="font-body text-sm">Title</Label>
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Students Taught"
            className="font-body text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-sm">Value</Label>
          <Input
            value={form.value}
            onChange={(e) => set("value", e.target.value)}
            placeholder="e.g. 5000+"
            className="font-body text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-sm">Icon (emoji or text)</Label>
          <Input
            value={form.icon}
            onChange={(e) => set("icon", e.target.value)}
            placeholder="🏆"
            className="font-body text-sm"
          />
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
          data-ocid="admin-save-achievement"
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

export function AchievementsTab() {
  const { data: achievements, isLoading } = useAchievements();
  const setAchievement = useSetAchievement();
  const deleteAchievement = useDeleteAchievement();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSave = async (a: Achievement) => {
    await setAchievement.mutateAsync(a);
    setEditingId(null);
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground font-body">
          {achievements?.length ?? 0} achievement
          {(achievements?.length ?? 0) !== 1 ? "s" : ""}
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
          data-ocid="admin-add-achievement"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </Button>
      </div>

      {adding && (
        <AchievementForm
          initial={EMPTY}
          onSave={handleSave}
          onCancel={() => setAdding(false)}
          saving={setAchievement.isPending}
        />
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements?.map((a) => (
          <div
            key={String(a.id)}
            className="bg-card rounded-xl border border-border p-4"
            data-ocid="admin-achievement-row"
          >
            {editingId === String(a.id) ? (
              <AchievementForm
                initial={a}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
                saving={setAchievement.isPending}
              />
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl">{a.icon}</span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-foreground text-lg leading-none">
                      {a.value}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5 truncate">
                      {a.title}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(String(a.id))}
                    className="gap-1 font-body"
                    data-ocid="admin-edit-achievement"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteAchievement.mutate(a.id)}
                    className="font-body text-destructive hover:text-destructive"
                    data-ocid="admin-delete-achievement"
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
