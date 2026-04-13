import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import type { SiteImage } from "../../backend.d.ts";
import {
  useDeleteSiteImage,
  useSetSiteImage,
  useSiteImages,
} from "../../hooks/useQueries";

const SECTIONS = [
  { key: "hero", label: "Hero Section" },
  { key: "about", label: "About Section" },
  { key: "book-cover", label: "Book Cover" },
  { key: "other", label: "Other" },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function ImageUploadCard({
  section,
  images,
  onUpload,
  onDelete,
  uploading,
}: {
  section: { key: string; label: string };
  images: SiteImage[];
  onUpload: (section: string, name: string, url: string) => void;
  onDelete: (id: bigint) => void;
  uploading: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, and WebP files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File must be under 5MB.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      onUpload(section.key, file.name, url);
    };
    reader.readAsDataURL(file);
    // Reset input
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUrlSave = () => {
    if (!urlInput.trim()) return;
    onUpload(section.key, nameInput || urlInput, urlInput.trim());
    setUrlInput("");
    setNameInput("");
    setShowUrl(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div
        className="px-4 py-3 border-b border-border"
        style={{
          background:
            "linear-gradient(90deg, oklch(var(--primary) / 0.06), oklch(var(--secondary) / 0.06))",
        }}
      >
        <p className="font-display font-semibold text-foreground text-sm">
          {section.label}
        </p>
        <p className="text-xs text-muted-foreground font-body">
          {images.length} image{images.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="p-4 space-y-3">
        {/* Current images */}
        {images.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground py-2">
            <ImageIcon className="w-4 h-4" />
            <span className="text-xs font-body">No images yet</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {images.map((img) => (
              <div
                key={String(img.id)}
                className="relative group rounded-lg overflow-hidden border border-border aspect-video bg-muted"
                data-ocid="admin-image-preview"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onDelete(img.id)}
                    className="bg-destructive text-destructive-foreground rounded-lg p-1.5"
                    aria-label="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-foreground/60 text-primary-foreground text-xs font-body px-2 py-1 truncate">
                  {img.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Upload area */}
        {error && (
          <p className="text-destructive text-xs font-body" role="alert">
            {error}
          </p>
        )}

        {showUrl ? (
          <div className="space-y-2">
            <div className="space-y-1.5">
              <Label className="font-body text-xs">Image Name</Label>
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Optional name"
                className="font-body text-xs h-8"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs">Image URL</Label>
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://…"
                className="font-body text-xs h-8"
                data-ocid="admin-image-url-input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleUrlSave}
                disabled={uploading || !urlInput.trim()}
                className="gap-1 font-body text-xs text-primary-foreground h-7"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
                }}
                data-ocid="admin-save-image-url"
              >
                <Plus className="w-3 h-3" /> Save URL
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowUrl(false)}
                className="font-body text-xs h-7"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <label
              htmlFor={`file-${section.key}`}
              className="flex-1 cursor-pointer"
              aria-label="Upload image file"
            >
              <div
                className="flex items-center justify-center gap-1.5 border border-dashed border-border rounded-lg py-2 text-xs font-body text-muted-foreground hover:text-foreground hover:border-primary transition-smooth"
                data-ocid="admin-upload-image"
              >
                <Upload className="w-3.5 h-3.5" />
                {uploading ? "Uploading…" : "Upload File"}
              </div>
              <input
                ref={fileRef}
                id={`file-${section.key}`}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFile}
                className="sr-only"
                disabled={uploading}
              />
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowUrl(true)}
              className="text-xs font-body gap-1 h-9"
            >
              <Plus className="w-3 h-3" /> URL
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ImagesTab() {
  const { data: images } = useSiteImages();
  const setSiteImage = useSetSiteImage();
  const deleteSiteImage = useDeleteSiteImage();

  const handleUpload = (section: string, name: string, url: string) => {
    setSiteImage.mutate({
      id: 0n,
      name,
      url,
      section,
      uploadedAt: BigInt(Date.now() * 1_000_000),
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-body">
        Upload images for different sections. Changes appear on the live website
        immediately. Supported: JPG, PNG, WebP (max 5MB).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <ImageUploadCard
            key={section.key}
            section={section}
            images={(images ?? []).filter((img) => img.section === section.key)}
            onUpload={handleUpload}
            onDelete={(id) => deleteSiteImage.mutate(id)}
            uploading={setSiteImage.isPending}
          />
        ))}
      </div>
    </div>
  );
}
