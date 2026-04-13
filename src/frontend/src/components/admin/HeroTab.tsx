import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import type { HeroContent } from "../../backend.d.ts";
import { useHeroContent, useSetHeroContent } from "../../hooks/useQueries";

const DEFAULT: HeroContent = { title: "", subtitle: "", ctaText: "" };

export function HeroTab() {
  const { data, isLoading } = useHeroContent();
  const setHero = useSetHeroContent();
  const [form, setForm] = useState<HeroContent>(DEFAULT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = (key: keyof HeroContent, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    await setHero.mutateAsync(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-xl">
      <p className="text-sm text-muted-foreground font-body">
        Edit the hero section headline, subtitle, and call-to-action button
        text.
      </p>

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      ) : (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Title</Label>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Hero title"
              className="font-body text-sm"
              data-ocid="admin-hero-title"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Subtitle</Label>
            <textarea
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              rows={3}
              placeholder="Hero subtitle…"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              data-ocid="admin-hero-subtitle"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">CTA Button Text</Label>
            <Input
              value={form.ctaText}
              onChange={(e) => set("ctaText", e.target.value)}
              placeholder="e.g. Enquire Now"
              className="font-body text-sm"
              data-ocid="admin-hero-cta"
            />
          </div>

          <Button
            type="button"
            onClick={handleSave}
            disabled={setHero.isPending}
            className="gap-2 font-body text-primary-foreground mt-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
            }}
            data-ocid="admin-save-hero"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : setHero.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
}
