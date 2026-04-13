import { Button } from "@/components/ui/button";
import { useHeroContent, useSiteImages } from "@/hooks/useQueries";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onEnquireClick: () => void;
}

export function HeroSection({ onEnquireClick }: HeroSectionProps) {
  const { data: heroContent } = useHeroContent();
  const { data: siteImages } = useSiteImages();

  const heroImage = siteImages?.find((img) => img.section === "hero");

  const title = heroContent?.title ?? "Rafi Sir";
  const subtitle =
    heroContent?.subtitle ?? "Master GST, Customs & FTP with Expert Guidance";
  const ctaText = heroContent?.ctaText ?? "Enquire Now";

  const scrollToCourses = () => {
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20"
      data-ocid="hero-section"
    >
      {/* Background image if set */}
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${heroImage.url})` }}
        />
      )}

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />
      <div
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-accent/6 blur-3xl pointer-events-none animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-body font-medium text-primary">
            India's Premier IDT Educator
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-tight mb-6"
        >
          {title}
          <span className="block gradient-accent">IDT Guru</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4"
        >
          {subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-base text-muted-foreground max-w-xl mx-auto mb-10"
        >
          Trusted coaching for CA Inter, CA Final, CMA &amp; CS students.
          Comprehensive coverage of Indirect Taxation with clarity, depth, and
          exam focus.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={scrollToCourses}
            variant="outline"
            className="font-display font-semibold text-base px-8 py-6 h-auto border-primary/30 hover:bg-primary/5 hover:border-primary transition-smooth"
            data-ocid="hero-courses-btn"
          >
            View Courses
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            size="lg"
            onClick={onEnquireClick}
            className="font-display font-semibold text-base px-8 py-6 h-auto shadow-elevated hover:shadow-elevated transition-smooth animate-pulse-glow"
            data-ocid="hero-enquire-btn"
          >
            {ctaText}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: "30+", label: "Years Experience" },
            { value: "5000+", label: "Students Trained" },
            { value: "95%", label: "Pass Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-bold text-3xl text-primary">
                {stat.value}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
