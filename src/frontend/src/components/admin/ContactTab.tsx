import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import type { ContactInfo } from "../../backend.d.ts";
import { useContactInfo, useSetContactInfo } from "../../hooks/useQueries";

const DEFAULT: ContactInfo = { phone: "", email: "", location: "", hours: "" };

export function ContactTab() {
  const { data, isLoading } = useContactInfo();
  const setContact = useSetContactInfo();
  const [form, setForm] = useState<ContactInfo>(DEFAULT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = (key: keyof ContactInfo, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    await setContact.mutateAsync(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-xl">
      <p className="text-sm text-muted-foreground font-body">
        This information is displayed in the Contact section of the website.
      </p>

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      ) : (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          {(
            [
              ["Phone", "phone", "tel"],
              ["Email", "email", "email"],
              ["Location", "location", "text"],
              ["Hours", "hours", "text"],
            ] as [string, keyof ContactInfo, string][]
          ).map(([label, key, type]) => (
            <div key={key} className="space-y-1.5">
              <Label className="font-body text-sm">{label}</Label>
              <Input
                type={type}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={label}
                className="font-body text-sm"
                data-ocid={`admin-contact-${key}`}
              />
            </div>
          ))}

          <Button
            type="button"
            onClick={handleSave}
            disabled={setContact.isPending}
            className="gap-2 font-body text-primary-foreground mt-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
            }}
            data-ocid="admin-save-contact"
          >
            <Save className="w-4 h-4" />
            {saved
              ? "Saved!"
              : setContact.isPending
                ? "Saving…"
                : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
}
