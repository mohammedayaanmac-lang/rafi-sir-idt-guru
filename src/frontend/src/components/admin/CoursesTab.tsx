import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Course } from "../../backend.d.ts";
import {
  useCourses,
  useDeleteCourse,
  useSetCourse,
} from "../../hooks/useQueries";

const EMPTY_COURSE: Course = {
  id: 0n,
  name: "",
  duration: "",
  price: "",
  mode: "",
  features: [],
};

function CourseForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Course;
  onSave: (c: Course) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Course>(initial);
  const [featureInput, setFeatureInput] = useState("");

  const set = (key: keyof Course, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const removeFeature = (i: number) =>
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== i),
    }));

  return (
    <div className="bg-muted/30 rounded-xl p-5 border border-border space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            ["Name", "name"],
            ["Duration", "duration"],
            ["Price", "price"],
            ["Mode", "mode"],
          ] as [string, keyof Course][]
        ).map(([label, key]) => (
          <div key={key} className="space-y-1.5">
            <Label className="font-body text-sm">{label}</Label>
            <Input
              value={String(form[key])}
              onChange={(e) => set(key, e.target.value)}
              className="font-body text-sm"
              placeholder={label}
            />
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label className="font-body text-sm">Features</Label>
        <div className="flex gap-2">
          <Input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
            placeholder="Add a feature…"
            className="font-body text-sm flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-body px-2 py-1 rounded-lg"
            >
              <CheckCircle className="w-3 h-3" />
              {f}
              <button
                type="button"
                onClick={() => removeFeature(form.features.indexOf(f))}
                className="ml-1 hover:text-destructive"
                aria-label="Remove feature"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-1">
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
          data-ocid="admin-save-course"
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

export function CoursesTab() {
  const { data: courses, isLoading } = useCourses();
  const setCourse = useSetCourse();
  const deleteCourse = useDeleteCourse();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSave = async (course: Course) => {
    await setCourse.mutateAsync(course);
    setEditingId(null);
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground font-body">
          {courses?.length ?? 0} course{(courses?.length ?? 0) !== 1 ? "s" : ""}
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
          data-ocid="admin-add-course"
        >
          <Plus className="w-4 h-4" /> Add Course
        </Button>
      </div>

      {adding && (
        <CourseForm
          initial={EMPTY_COURSE}
          onSave={handleSave}
          onCancel={() => setAdding(false)}
          saving={setCourse.isPending}
        />
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      )}

      <div className="space-y-3">
        {courses?.map((course) => (
          <div
            key={String(course.id)}
            className="bg-card rounded-xl border border-border p-4"
            data-ocid="admin-course-row"
          >
            {editingId === String(course.id) ? (
              <CourseForm
                initial={course}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
                saving={setCourse.isPending}
              />
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display font-semibold text-foreground text-sm">
                    {course.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                    {course.duration} · {course.mode} · {course.price}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {course.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="text-xs font-body text-primary bg-primary/10 px-2 py-0.5 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                    {course.features.length > 3 && (
                      <span className="text-xs font-body text-muted-foreground">
                        +{course.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(String(course.id))}
                    className="gap-1 font-body"
                    data-ocid="admin-edit-course"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteCourse.mutate(course.id)}
                    className="gap-1 font-body text-destructive hover:text-destructive"
                    data-ocid="admin-delete-course"
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
