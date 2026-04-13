import { Badge } from "@/components/ui/badge";
import { useSiteImages } from "@/hooks/useQueries";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

const EXPERTISE = [
  "GST & Indirect Tax Framework",
  "Customs Law & Procedures",
  "Foreign Trade Policy (FTP)",
  "CA Inter & Final Exam Strategy",
  "CMA & CS IDT Coverage",
  "Practical Case Studies",
];

export function AboutSection() {
  const { data: siteImages } = useSiteImages();
  const profileImage = siteImages?.find((img) => img.section === "about");

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-background"
      data-ocid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-elevated bg-card border border-border">
              {profileImage ? (
                <img
                  src={profileImage.url}
                  alt="Rafi Sir – IDT Guru"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-float">
                    <GraduationCap className="w-12 h-12 text-primary" />
                  </div>
                  <span className="font-display font-bold text-2xl text-foreground">
                    Rafi Sir
                  </span>
                  <span className="font-body text-sm text-muted-foreground mt-1">
                    IDT Guru
                  </span>
                </div>
              )}
              {/* Decorative badge */}
              <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-2xl p-3 shadow-subtle">
                <p className="font-display font-semibold text-sm text-foreground text-center">
                  30+ Years of IDT Teaching Excellence
                </p>
              </div>
            </div>

            {/* Floating card */}
            <div
              className="absolute -top-4 -right-4 bg-card shadow-elevated rounded-2xl p-4 border border-border animate-float"
              style={{ animationDelay: "1s" }}
            >
              <p className="font-display font-bold text-xl text-primary">
                5000+
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Students Trained
              </p>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="secondary" className="mb-4 font-body">
                About the Educator
              </Badge>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground leading-tight mb-4">
                Meet <span className="gradient-accent">Rafi Sir</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                With over three decades of dedicated teaching in Indirect
                Taxation, Rafi Sir has shaped the careers of thousands of CA,
                CMA, and CS aspirants across India. A pioneer in simplifying
                complex GST, Customs, and FTP concepts, his teaching methodology
                combines deep theoretical grounding with practical application.
              </p>
            </div>

            <p className="font-body text-muted-foreground leading-relaxed">
              Based in Chennai, Rafi Sir has consistently delivered exceptional
              results. His students regularly rank in top positions across CA
              Inter, CA Final, CMA, and CS examinations. He believes that
              mastery of IDT is not just about passing exams — it's about
              building competent professionals for India's tax ecosystem.
            </p>

            {/* Teaching Philosophy */}
            <div className="bg-muted/40 rounded-2xl p-5 border border-border">
              <p className="font-display font-semibold text-foreground mb-1 text-sm">
                Teaching Philosophy
              </p>
              <p className="font-body text-sm text-muted-foreground italic">
                "Clarity over complexity. Every student deserves to understand
                the why behind every law, not just memorize provisions."
              </p>
            </div>

            {/* Expertise grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXPERTISE.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
