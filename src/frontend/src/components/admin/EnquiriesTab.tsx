import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpDown,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { Enquiry } from "../../backend.d.ts";
import { useEnquiries } from "../../hooks/useQueries";

type SortKey = "date-desc" | "date-asc" | "name-asc" | "name-desc";

const SKELETON_IDS = ["s1", "s2", "s3", "s4", "s5"];

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function EnquiriesTab() {
  const { data: enquiries, isLoading } = useEnquiries();
  const [filterCourse, setFilterCourse] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("date-desc");

  const courseOptions = useMemo(() => {
    if (!enquiries) return [];
    const unique = Array.from(
      new Set(enquiries.map((e) => e.courseOrBook).filter(Boolean)),
    );
    return unique.sort();
  }, [enquiries]);

  const filtered = useMemo(() => {
    if (!enquiries) return [];
    let result: Enquiry[] = [...enquiries];
    if (filterCourse !== "all") {
      result = result.filter((e) => e.courseOrBook === filterCourse);
    }
    result.sort((a, b) => {
      if (sortKey === "date-desc") return Number(b.timestamp - a.timestamp);
      if (sortKey === "date-asc") return Number(a.timestamp - b.timestamp);
      if (sortKey === "name-asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    return result;
  }, [enquiries, filterCourse, sortKey]);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: enquiries?.length ?? 0, color: "primary" },
          {
            label: "Courses",
            value:
              enquiries?.filter((e) =>
                ["ca", "cma", "cs", "gst", "custom"].some((k) =>
                  e.courseOrBook.toLowerCase().includes(k),
                ),
              ).length ?? 0,
            color: "secondary",
          },
          {
            label: "Books",
            value:
              enquiries?.filter((e) =>
                e.courseOrBook.toLowerCase().includes("book"),
              ).length ?? 0,
            color: "accent",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-muted/40 rounded-xl p-4 border border-border"
          >
            <p className="text-2xl font-display font-bold text-foreground">
              {isLoading ? "—" : stat.value}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={filterCourse} onValueChange={setFilterCourse}>
          <SelectTrigger
            className="w-48 font-body text-sm"
            data-ocid="enquiry-filter-course"
          >
            <SelectValue placeholder="Filter by course/book" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All enquiries</SelectItem>
            {courseOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
          <SelectTrigger
            className="w-44 font-body text-sm"
            data-ocid="enquiry-sort"
          >
            <ArrowUpDown className="w-3.5 h-3.5 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Date (Newest first)</SelectItem>
            <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
            <SelectItem value="name-asc">
              <span className="flex items-center gap-1">
                <ArrowDownAZ className="w-3.5 h-3.5" /> Name A→Z
              </span>
            </SelectItem>
            <SelectItem value="name-desc">
              <span className="flex items-center gap-1">
                <ArrowDownZA className="w-3.5 h-3.5" /> Name Z→A
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        {(filterCourse !== "all" || sortKey !== "date-desc") && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground font-body text-xs"
            onClick={() => {
              setFilterCourse("all");
              setSortKey("date-desc");
            }}
          >
            <X className="w-3.5 h-3.5" /> Clear filters
          </Button>
        )}

        <span className="ml-auto text-xs text-muted-foreground font-body">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-subtle">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {SKELETON_IDS.map((sid) => (
              <div key={sid} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12" data-ocid="admin-empty-state">
            <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-body text-sm text-muted-foreground">
              No enquiries found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" data-ocid="admin-enquiries-table">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {[
                    "Student",
                    "Contact",
                    "Course / Book",
                    "Message",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((enq) => (
                  <tr
                    key={String(enq.id)}
                    className="hover:bg-muted/30 transition-smooth"
                    data-ocid="admin-enquiry-row"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-display font-bold text-primary">
                            {enq.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-body font-medium text-foreground text-sm whitespace-nowrap">
                          {enq.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs font-body text-muted-foreground">
                            {enq.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs font-body text-muted-foreground truncate max-w-[150px]">
                            {enq.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        variant="secondary"
                        className="text-xs font-body whitespace-nowrap"
                      >
                        {enq.courseOrBook}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 max-w-[180px]">
                      <p className="text-xs font-body text-muted-foreground truncate">
                        {enq.message || "—"}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-body text-muted-foreground whitespace-nowrap">
                          {formatDate(enq.timestamp)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Input field helper
export function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="font-body text-sm text-foreground">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-body text-sm"
      />
    </div>
  );
}
