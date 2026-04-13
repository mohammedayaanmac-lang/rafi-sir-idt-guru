import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  onEnquireClick: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Books", href: "#books" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onEnquireClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-ocid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-subtle border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            data-ocid="navbar-logo"
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-subtle group-hover:shadow-elevated transition-smooth">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-foreground text-lg leading-tight block">
                Rafi Sir
              </span>
              <span className="text-xs text-muted-foreground font-body tracking-wide">
                IDT Guru
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                data-ocid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onEnquireClick}
              className="hidden sm:inline-flex font-display font-semibold shadow-subtle hover:shadow-elevated transition-smooth animate-pulse-glow"
              data-ocid="navbar-enquire-btn"
            >
              Enquire Now
            </Button>
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-smooth"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="navbar-hamburger"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="lg:hidden bg-card border-t border-border shadow-elevated"
          data-ocid="mobile-nav-drawer"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="w-full text-left px-4 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                data-ocid={`mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  onEnquireClick();
                }}
                className="w-full font-display font-semibold"
                data-ocid="mobile-enquire-btn"
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
