import { BookOpen, LogOut } from "lucide-react";
import { useState } from "react";
import { AchievementsTab } from "../components/admin/AchievementsTab";
import { BooksTab } from "../components/admin/BooksTab";
import { ContactTab } from "../components/admin/ContactTab";
import { CoursesTab } from "../components/admin/CoursesTab";
import { EnquiriesTab } from "../components/admin/EnquiriesTab";
import { FAQsTab } from "../components/admin/FAQsTab";
import { HeroTab } from "../components/admin/HeroTab";
import { ImagesTab } from "../components/admin/ImagesTab";
import { TestimonialsTab } from "../components/admin/TestimonialsTab";

type TabId =
  | "enquiries"
  | "courses"
  | "books"
  | "testimonials"
  | "faqs"
  | "contact"
  | "achievements"
  | "hero"
  | "images";

const TABS: { id: TabId; label: string }[] = [
  { id: "enquiries", label: "Enquiries" },
  { id: "courses", label: "Courses" },
  { id: "books", label: "Books" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQs" },
  { id: "contact", label: "Contact" },
  { id: "achievements", label: "Achievements" },
  { id: "hero", label: "Hero" },
  { id: "images", label: "Images" },
];

interface AdminPageProps {
  onLogout: () => void;
}

export function AdminPage({ onLogout }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<TabId>("enquiries");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--primary)), oklch(var(--secondary)))",
                }}
              >
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-foreground text-base block leading-tight">
                  Admin Panel
                </span>
                <span className="text-xs text-muted-foreground font-body">
                  Rafi Sir – IDT Guru
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth px-3 py-2 rounded-lg hover:bg-muted"
              data-ocid="admin-logout-btn"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex overflow-x-auto scrollbar-none -mb-px"
            aria-label="Admin tabs"
          >
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-body whitespace-nowrap border-b-2 transition-smooth shrink-0 ${
                  activeTab === tab.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
                data-ocid={`admin-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-display font-bold text-foreground text-xl">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-0.5">
            Changes are saved to the backend and reflected on the live website
            immediately.
          </p>
        </div>

        {activeTab === "enquiries" && <EnquiriesTab />}
        {activeTab === "courses" && <CoursesTab />}
        {activeTab === "books" && <BooksTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
        {activeTab === "faqs" && <FAQsTab />}
        {activeTab === "contact" && <ContactTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "hero" && <HeroTab />}
        {activeTab === "images" && <ImagesTab />}
      </main>

      <footer className="bg-muted/40 border-t border-border py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
