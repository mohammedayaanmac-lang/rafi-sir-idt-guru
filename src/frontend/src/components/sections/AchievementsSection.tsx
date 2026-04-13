import type { Achievement } from "@/backend.d.ts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAchievements } from "@/hooks/useQueries";
import { Medal, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  { id: 1n, value: "30+", title: "Years of Experience", icon: "Trophy" },
  { id: 2n, value: "5000+", title: "Students Trained", icon: "Star" },
  { id: 3n, value: "95%", title: "Pass Rate", icon: "Medal" },
  { id: 4n, value: "12+", title: "Books Published", icon: "Trophy" },
];

const AWARDS = [
  {
    title: "Best IDT Educator Award",
    year: "2023",
    org: "All India Commerce Faculty Council",
  },
  {
    title: "Excellence in CA Teaching",
    year: "2021",
    org: "ICAI Chennai Chapter",
  },
  {
    title: "Outstanding Mentor Award",
    year: "2019",
    org: "CMA Association of Southern India",
  },
];

const ICON_MAP: Record<string, typeof Trophy> = {
  Trophy,
  Star,
  Medal,
};

function parseNumber(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  return Number.parseFloat(cleaned) || 0;
}

function extractSuffix(value: string): string {
  return value.replace(/[0-9.]/g, "").trim();
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setCount(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.3 },
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function AchievementsSection() {
  const { data: backendAchievements, isLoading } = useAchievements();

  const achievements =
    backendAchievements && backendAchievements.length > 0
      ? backendAchievements
      : FALLBACK_ACHIEVEMENTS;

  return (
    <section
      id="achievements"
      className="py-20 lg:py-28 bg-muted/30"
      data-ocid="achievements-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4 font-body">
            Achievements
          </Badge>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Milestones of <span className="gradient-accent">Excellence</span>
          </h2>
        </motion.div>

        {/* Animated counters */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => {
              const IconComp = ICON_MAP[achievement.icon] ?? Trophy;
              const numericValue = parseNumber(achievement.value);
              const suffix = extractSuffix(achievement.value);
              return (
                <motion.div
                  key={String(achievement.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-3xl p-6 border border-border shadow-subtle text-center"
                  data-ocid={`stat-${achievement.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-display font-bold text-4xl text-primary mb-1">
                    <Counter target={numericValue} suffix={suffix} />
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {achievement.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Awards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AWARDS.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-subtle flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Trophy className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm leading-tight mb-1">
                  {award.title}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {award.org}
                </p>
                <Badge variant="outline" className="mt-2 text-xs font-body">
                  {award.year}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
