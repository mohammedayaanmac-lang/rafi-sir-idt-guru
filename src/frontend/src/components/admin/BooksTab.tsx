import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Book } from "../../backend.d.ts";
import { useBooks, useDeleteBook, useSetBook } from "../../hooks/useQueries";

const EMPTY_BOOK: Book = {
  id: 0n,
  title: "",
  subject: "",
  edition: "",
  description: "",
  coverImageId: "",
};

function BookForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Book;
  onSave: (b: Book) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Book>(initial);
  const set = (key: keyof Book, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-muted/30 rounded-xl p-5 border border-border space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            ["Title", "title"],
            ["Subject", "subject"],
            ["Edition", "edition"],
            ["Cover Image URL", "coverImageId"],
          ] as [string, keyof Book][]
        ).map(([label, key]) => (
          <div key={key} className="space-y-1.5">
            <Label className="font-body text-sm">{label}</Label>
            <Input
              value={String(form[key])}
              onChange={(e) => set(key, e.target.value)}
              placeholder={label}
              className="font-body text-sm"
            />
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <Label className="font-body text-sm">Description</Label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          placeholder="Book description…"
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
          data-ocid="admin-save-book"
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

export function BooksTab() {
  const { data: books, isLoading } = useBooks();
  const setBook = useSetBook();
  const deleteBook = useDeleteBook();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSave = async (book: Book) => {
    await setBook.mutateAsync(book);
    setEditingId(null);
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground font-body">
          {books?.length ?? 0} book{(books?.length ?? 0) !== 1 ? "s" : ""}
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
          data-ocid="admin-add-book"
        >
          <Plus className="w-4 h-4" /> Add Book
        </Button>
      </div>

      {adding && (
        <BookForm
          initial={EMPTY_BOOK}
          onSave={handleSave}
          onCancel={() => setAdding(false)}
          saving={setBook.isPending}
        />
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      )}

      <div className="space-y-3">
        {books?.map((book) => (
          <div
            key={String(book.id)}
            className="bg-card rounded-xl border border-border p-4"
            data-ocid="admin-book-row"
          >
            {editingId === String(book.id) ? (
              <BookForm
                initial={book}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
                saving={setBook.isPending}
              />
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex gap-3">
                  {book.coverImageId && (
                    <img
                      src={book.coverImageId}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-lg shrink-0 border border-border"
                    />
                  )}
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {book.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      {book.subject} · {book.edition}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(String(book.id))}
                    className="gap-1 font-body"
                    data-ocid="admin-edit-book"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteBook.mutate(book.id)}
                    className="gap-1 font-body text-destructive hover:text-destructive"
                    data-ocid="admin-delete-book"
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
