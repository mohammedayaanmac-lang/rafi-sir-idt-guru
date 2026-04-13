import type { Achievement } from "@/backend.d.ts";
import { useAchievements } from "@/hooks/useQueries";
import { Award, BookOpen, Medal, Star, Trophy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DEFAULT_HIGHLIGHTS = [
  { icon: Award, label: "GST Expert" },
  { icon: Star, label: "30+ Years Experience" },
  { icon: Users, label: "Thousands of Students" },
  { icon: BookOpen, label: "CA • CMA • CS" },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Trophy,
  Star,
  Medal,
  Award,
  Users,
  BookOpen,
};

function achievementToHighlight(a: Achievement) {
  const IconComp = ICON_MAP[a.icon] ?? Trophy;
  return { icon: IconComp, label: `${a.value} ${a.title}` };
}

export function HighlightsBar() {
  const { data: achievements } = useAchievements();

  const highlights =
    achievements && achievements.length > 0
      ? achievements.slice(0, 4).map(achievementToHighlight)
      : DEFAULT_HIGHLIGHTS;

  return (
    <div
      className="bg-primary border-y border-primary/20"
      data-ocid="highlights-bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <item.icon className="w-4 h-4 text-primary-foreground/80" />
              <span className="font-display font-semibold text-sm text-primary-foreground whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
