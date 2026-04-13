import { useContactInfo } from "@/hooks/useQueries";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Books", href: "#books" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const FALLBACK = {
  phone: "+91 98765 43210",
  email: "rafisir@idtguru.in",
  location: "Chennai, Tamil Nadu, India",
};

export function Footer() {
  const year = new Date().getFullYear();
  const { data: contactInfo } = useContactInfo();

  const phone = contactInfo?.phone ?? FALLBACK.phone;
  const email = contactInfo?.email ?? FALLBACK.email;
  const location = contactInfo?.location ?? FALLBACK.location;

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-subtle">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-foreground text-lg block leading-tight">
                  Rafi Sir
                </span>
                <span className="text-xs text-muted-foreground font-body tracking-wide">
                  IDT Guru
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
              India's trusted commerce educator specializing in GST, Customs &
              FTP for CA, CMA, and CS aspirants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth font-body"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground font-body">
                  {phone}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground font-body">
                  {email}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground font-body">
                  {location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            © {year}. All rights reserved. Rafi Sir – IDT Guru.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Built with love using{" "}
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
      </div>
    </footer>
  );
}
