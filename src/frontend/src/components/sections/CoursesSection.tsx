import type { Course } from "@/backend.d.ts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourses } from "@/hooks/useQueries";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Monitor,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const FALLBACK_COURSES: Course[] = [
  {
    id: 1n,
    name: "CA Inter – IDT",
    duration: "4 Months",
    mode: "Online & Offline",
    price: "Contact for pricing",
    features: [
      "Complete GST Coverage (CGST, IGST, SGST)",
      "Customs Duty & Valuation",
      "Foreign Trade Policy Basics",
      "Regular Mock Tests & RTPs",
      "Study Material Included",
      "Doubt Clearing Sessions",
    ],
  },
  {
    id: 2n,
    name: "CA Final – IDT",
    duration: "5 Months",
    mode: "Online & Offline",
    price: "Contact for pricing",
    features: [
      "Advanced GST Provisions",
      "Customs Law & SEZ",
      "FTP (Foreign Trade Policy)",
      "Case Studies & Judicial Decisions",
      "Amendments & Circulars",
      "Comprehensive Study Notes",
    ],
  },
  {
    id: 3n,
    name: "CMA / CS – IDT",
    duration: "3 Months",
    mode: "Online & Offline",
    price: "Contact for pricing",
    features: [
      "GST for CMA / CS Syllabus",
      "Customs Duty Essentials",
      "Practice Papers & MCQs",
      "Exam Strategy Sessions",
      "Recorded Lectures Access",
      "WhatsApp Support Group",
    ],
  },
];

interface CoursesSectionProps {
  onEnquireClick: (course: string) => void;
}

export function CoursesSection({ onEnquireClick }: CoursesSectionProps) {
  const [expanded, setExpanded] = useState<bigint | null>(null);
  const { data: backendCourses, isLoading } = useCourses();

  const courses =
    backendCourses && backendCourses.length > 0
      ? backendCourses
      : FALLBACK_COURSES;

  return (
    <section
      id="courses"
      className="py-20 lg:py-28 bg-muted/30"
      data-ocid="courses-section"
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
            Our Courses
          </Badge>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Programs for Every{" "}
            <span className="gradient-accent">Aspiration</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Structured courses designed for CA, CMA, and CS students with
            exam-focused content, practical insights, and mentorship.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const isExpanded = expanded === course.id;
              return (
                <motion.div
                  key={String(course.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-3xl border border-border shadow-subtle hover:shadow-elevated transition-smooth flex flex-col overflow-hidden"
                  data-ocid={`course-card-${course.id}`}
                >
                  {/* Card header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="default" className="text-xs font-body">
                        Course
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-1">
                      {course.name}
                    </h3>
                    {course.price && (
                      <p className="font-body text-sm text-primary font-semibold mt-1">
                        {course.price}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 mt-3">
                      <Monitor className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-body text-primary">
                        {course.mode}
                      </span>
                    </div>
                  </div>

                  {/* Expandable features */}
                  <div className="px-6 pb-4">
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : course.id)}
                      className="flex items-center gap-1.5 text-sm font-body text-primary hover:text-primary/80 transition-smooth"
                      data-ocid={`course-expand-${course.id}`}
                    >
                      {isExpanded ? (
                        <>
                          Hide Features <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          View Features <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2">
                        {course.features.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="text-xs font-body text-muted-foreground">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto px-6 pb-6">
                    <Button
                      className="w-full font-display font-semibold"
                      onClick={() => onEnquireClick(course.name)}
                      data-ocid={`course-enquire-${course.id}`}
                    >
                      Enquire for Class
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
