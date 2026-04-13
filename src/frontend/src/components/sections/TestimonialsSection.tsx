import type { Testimonial } from "@/backend.d.ts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials } from "@/hooks/useQueries";
import { Star } from "lucide-react";
import { motion } from "motion/react";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1n,
    studentName: "Priya Venkataraman",
    qualification: "CA Finalist",
    rating: 5n,
    isVisible: true,
    text: "Rafi Sir's teaching style is extraordinary. His ability to break down complex GST provisions into simple, memorable concepts helped me score 72 in IDT. Highly recommend to every CA Final student.",
  },
  {
    id: 2n,
    studentName: "Arjun Krishnamurthy",
    qualification: "CA Intermediate",
    rating: 5n,
    isVisible: true,
    text: "The way Rafi Sir explains Customs law with real-world examples is unmatched. I cleared CA Inter IDT in my first attempt with 68 marks. His notes are gold.",
  },
  {
    id: 3n,
    studentName: "Kavitha Subramanian",
    qualification: "CMA Student",
    rating: 5n,
    isVisible: true,
    text: "I was struggling with FTP before joining Rafi Sir's batch. His structured approach and dedicated doubt sessions made all the difference. Cleared with distinction!",
  },
  {
    id: 4n,
    studentName: "Mohammed Rizwan",
    qualification: "CS Executive",
    rating: 5n,
    isVisible: true,
    text: "Rafi Sir's IDT course for CS students is perfectly tailored. He understands what the institute expects and prepares you accordingly. Best investment for exam prep.",
  },
  {
    id: 5n,
    studentName: "Ananya Bhatt",
    qualification: "CA Final AIR 12",
    rating: 5n,
    isVisible: true,
    text: "Got All India Rank 12 in CA Final! Rafi Sir's comprehensive coverage of amendments and his focus on practical problems in GST made IDT my strongest paper.",
  },
];

const STAR_IDS = ["s1", "s2", "s3", "s4", "s5"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_IDS.map((sid, i) => (
        <Star
          key={sid}
          className={`w-3.5 h-3.5 ${i < rating ? "text-accent-foreground fill-current" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const { data: backendTestimonials, isLoading } = useTestimonials();

  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials.filter((t) => t.isVisible)
      : FALLBACK_TESTIMONIALS;

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-background"
      data-ocid="testimonials-section"
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
            Student Reviews
          </Badge>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
            What Students <span className="gradient-accent">Say</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Thousands of CA, CMA, and CS students have transformed their IDT
            preparation with Rafi Sir.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-52 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, index) => {
              const initial = t.studentName.charAt(0).toUpperCase();
              const rating = Number(t.rating);
              return (
                <motion.div
                  key={String(t.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-card rounded-3xl border border-border shadow-subtle p-6 flex flex-col gap-4 hover:shadow-elevated transition-smooth ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                  data-ocid={`testimonial-${t.id}`}
                >
                  {/* Rating */}
                  <StarRating rating={rating} />

                  {/* Review */}
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 italic">
                    "{t.text}"
                  </p>

                  {/* Student */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-sm text-primary">
                        {initial}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-foreground">
                        {t.studentName}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {t.qualification}
                      </p>
                    </div>
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
