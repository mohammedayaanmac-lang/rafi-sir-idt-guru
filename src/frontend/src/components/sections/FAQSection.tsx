import type { FAQ } from "@/backend.d.ts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useFAQs } from "@/hooks/useQueries";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const FALLBACK_FAQS: FAQ[] = [
  {
    id: 1n,
    order: 1n,
    question: "Who are these courses best suited for?",
    answer:
      "Rafi Sir's IDT courses are designed specifically for CA Inter, CA Final, CMA, and CS students who want comprehensive, exam-focused coverage of GST, Customs, and FTP. Both beginners and students repeating their attempts benefit greatly.",
  },
  {
    id: 2n,
    order: 2n,
    question: "Are classes available online?",
    answer:
      "Yes! All courses are available in both online and offline modes. Online students receive recorded lectures, digital study materials, and access to live doubt-clearing sessions. Offline classes are conducted at our Chennai centre.",
  },
  {
    id: 3n,
    order: 3n,
    question: "How often are the study materials updated?",
    answer:
      "Study materials are updated every semester to reflect the latest amendments, circulars, notifications, and exam-relevant changes from the Finance Act. You will always have the most current content.",
  },
  {
    id: 4n,
    order: 4n,
    question: "Is there support for doubt resolution?",
    answer:
      "Absolutely. Every student gets access to dedicated doubt sessions (weekly), a WhatsApp support group for quick queries, and one-on-one clarification for complex problems. No question goes unanswered.",
  },
  {
    id: 5n,
    order: 5n,
    question: "How can I enrol or get more information?",
    answer:
      "Click the 'Enquire Now' button anywhere on this page to fill out a short form. Rafi Sir's team will contact you within 24 hours to discuss batch timings, fees, and study plans customized for your exam schedule.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<bigint | null>(1n);
  const { data: backendFAQs, isLoading } = useFAQs();

  const faqs =
    backendFAQs && backendFAQs.length > 0
      ? [...backendFAQs].sort((a, b) => Number(a.order) - Number(b.order))
      : FALLBACK_FAQS;

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-muted/30"
      data-ocid="faq-section"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4 font-body">
            FAQ
          </Badge>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Frequently Asked <span className="gradient-accent">Questions</span>
          </h2>
          <p className="font-body text-muted-foreground">
            Everything you need to know before joining a course.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={String(faq.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-card rounded-2xl border border-border shadow-subtle overflow-hidden"
                  data-ocid={`faq-item-${faq.id}`}
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-smooth"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    data-ocid={`faq-toggle-${faq.id}`}
                  >
                    <span className="font-display font-semibold text-sm text-foreground pr-4">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
