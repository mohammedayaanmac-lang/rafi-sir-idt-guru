import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContactInfo } from "@/hooks/useQueries";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

const DEFAULT_CONTACT = {
  phone: "+91 98765 43210",
  email: "rafisir@idtguru.in",
  location: "Chennai, Tamil Nadu, India",
  hours: "Mon–Sat, 9 AM – 6 PM IST",
};

interface ContactSectionProps {
  onEnquireClick: () => void;
}

export function ContactSection({ onEnquireClick }: ContactSectionProps) {
  const { data: contactInfo } = useContactInfo();

  const contact = contactInfo ?? DEFAULT_CONTACT;

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: MapPin,
      label: "Location",
      value: contact.location,
      href: "#",
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: contact.hours,
      href: "#",
      color: "bg-primary/10 text-primary",
    },
  ];

  const whatsappPhone = contact.phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=Hi%20Rafi%20Sir%2C%20I%20would%20like%20to%20enquire%20about%20your%20IDT%20courses.`;

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-background"
      data-ocid="contact-section"
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
            Get in Touch
          </Badge>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Ready to Master <span className="gradient-accent">IDT?</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Reach out to Rafi Sir's team for course details, batch timings, and
            personalized study plans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 bg-card rounded-2xl p-5 border border-border shadow-subtle hover:shadow-elevated transition-smooth"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-0.5">
                    {item.label}
                  </p>
                  {item.href !== "#" ? (
                    <a
                      href={item.href}
                      className="font-display font-semibold text-sm text-foreground hover:text-primary transition-smooth"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-display font-semibold text-sm text-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl border border-border shadow-elevated p-8 lg:p-10 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-float">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>

            <h3 className="font-display font-bold text-2xl text-foreground mb-3">
              Start Your Journey Today
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Fill out a quick enquiry form and Rafi Sir's team will get back to
              you within 24 hours with a personalized study plan and batch
              details.
            </p>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full font-display font-semibold text-base shadow-elevated hover:shadow-elevated transition-smooth animate-pulse-glow"
                onClick={onEnquireClick}
                data-ocid="contact-enquire-btn"
              >
                Enquire Now
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact-whatsapp-btn"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full font-display font-semibold text-base border-[#25D366]/30 hover:bg-[#25D366]/5 hover:border-[#25D366] text-foreground transition-smooth mt-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2 fill-[#25D366]"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
