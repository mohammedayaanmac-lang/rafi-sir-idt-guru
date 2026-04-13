import type { Book } from "@/backend.d.ts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBooks, useSiteImages } from "@/hooks/useQueries";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";

const COVER_COLORS = [
  "from-primary/20 to-primary/5",
  "from-secondary/20 to-secondary/5",
  "from-accent/20 to-accent/5",
  "from-primary/15 to-secondary/10",
];

const FALLBACK_BOOKS: Book[] = [
  {
    id: 1n,
    title: "GST Practitioner's Guide",
    subject: "Goods & Services Tax",
    description:
      "A comprehensive reference covering all aspects of GST — registration, returns, ITC, audits, and assessments. Ideal for students and practitioners alike.",
    edition: "2024–25 Edition",
    coverImageId: "",
  },
  {
    id: 2n,
    title: "Customs & FTP Handbook",
    subject: "Customs Law & Foreign Trade Policy",
    description:
      "Complete coverage of customs duties, valuation, SEZ, FTP schemes, and export-import procedures. Updated with latest amendments and circulars.",
    edition: "2024–25 Edition",
    coverImageId: "",
  },
  {
    id: 3n,
    title: "IDT Question Bank",
    subject: "Indirect Tax Practice",
    description:
      "Exhaustive collection of exam-focused questions, MCQs, case studies, and solved problems for CA, CMA, and CS IDT papers.",
    edition: "2024–25 Edition",
    coverImageId: "",
  },
  {
    id: 4n,
    title: "CA Final IDT Compact Notes",
    subject: "CA Final Exam Prep",
    description:
      "Quick revision notes covering high-yield topics, amendments, and important case laws for CA Final IDT. Perfect for last-mile preparation.",
    edition: "2024–25 Edition",
    coverImageId: "",
  },
];

interface BooksSectionProps {
  onEnquireClick: (book: string) => void;
}

export function BooksSection({ onEnquireClick }: BooksSectionProps) {
  const { data: backendBooks, isLoading } = useBooks();
  const { data: siteImages } = useSiteImages();

  const books =
    backendBooks && backendBooks.length > 0 ? backendBooks : FALLBACK_BOOKS;

  const getBookCoverUrl = (book: Book): string | null => {
    if (!book.coverImageId || !siteImages) return null;
    const image = siteImages.find(
      (img) => String(img.id) === book.coverImageId,
    );
    return image?.url ?? null;
  };

  return (
    <section
      id="books"
      className="py-20 lg:py-28 bg-background"
      data-ocid="books-section"
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
            Publications
          </Badge>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Study Materials & <span className="gradient-accent">Books</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Authored by Rafi Sir — carefully crafted study materials designed
            for exam success and deep conceptual understanding.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-96 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book, index) => {
              const coverUrl = getBookCoverUrl(book);
              const coverColor = COVER_COLORS[index % COVER_COLORS.length];
              return (
                <motion.div
                  key={String(book.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-3xl border border-border shadow-subtle hover:shadow-elevated transition-smooth flex flex-col overflow-hidden group"
                  data-ocid={`book-card-${book.id}`}
                >
                  {/* Book cover */}
                  <div
                    className={`aspect-[3/4] ${coverUrl ? "" : `bg-gradient-to-br ${coverColor}`} flex flex-col items-center justify-center p-6 relative overflow-hidden`}
                  >
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,oklch(var(--border))_1px,transparent_1px),linear-gradient(-45deg,oklch(var(--border))_1px,transparent_1px)] bg-[size:20px_20px]" />
                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-card/80 shadow-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                          <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <p className="relative z-10 font-display font-bold text-sm text-foreground text-center leading-tight">
                          {book.title}
                        </p>
                      </>
                    )}
                    <Badge
                      variant="secondary"
                      className="relative z-10 mt-2 text-xs font-body"
                    >
                      {book.edition}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="font-display font-semibold text-xs text-primary uppercase tracking-wider mb-2">
                      {book.subject}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      {book.description}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full font-display font-semibold border-primary/30 hover:bg-primary/5 hover:border-primary transition-smooth"
                      onClick={() => onEnquireClick(`${book.title} (Book)`)}
                      data-ocid={`book-enquire-${book.id}`}
                    >
                      Enquire for Book
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
