import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ADMIN_PASSWORD = "AdminRafi@1971";

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminPasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("Incorrect password");
      setPassword("");
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      aria-label="Admin login"
      open
      className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent p-0 m-0 max-w-none w-full h-full"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
        role="presentation"
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-sm mx-4 p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--primary) / 0.15), oklch(var(--secondary) / 0.15))",
            }}
          >
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">
            Admin Access
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Enter your admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password" className="font-body text-sm">
              Password
            </Label>
            <Input
              ref={inputRef}
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              className="font-body"
              data-ocid="admin-password-input"
            />
            {error && (
              <p className="text-destructive text-xs font-body" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 font-body"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 font-body text-primary-foreground"
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
              }}
              data-ocid="admin-password-submit"
            >
              Enter
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
