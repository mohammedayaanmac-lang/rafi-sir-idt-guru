import { Lock } from "lucide-react";

interface AdminButtonProps {
  onClick: () => void;
}

export function AdminButton({ onClick }: AdminButtonProps) {
  return (
    <button
      onClick={onClick}
      data-ocid="admin-fab-btn"
      aria-label="Open admin panel"
      type="button"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-elevated flex items-center justify-center transition-smooth hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{
        background:
          "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
      }}
    >
      <Lock className="w-5 h-5 text-primary-foreground" />
    </button>
  );
}
