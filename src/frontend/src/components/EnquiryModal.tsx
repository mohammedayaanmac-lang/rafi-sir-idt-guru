import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EnquiryFormData } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: string;
}

interface ActorWithSubmit {
  submitEnquiry: (
    name: string,
    phone: string,
    email: string,
    courseOrBook: string,
    message: string,
  ) => Promise<void>;
}

const COURSE_OPTIONS = [
  "CA Inter – IDT",
  "CA Final – IDT",
  "CMA / CS Courses",
  "GST Practitioner's Guide (Book)",
  "Customs & FTP Handbook (Book)",
  "IDT Question Bank (Book)",
  "CA Final IDT Compact Notes (Book)",
  "General Enquiry",
];

export function EnquiryModal({
  isOpen,
  onClose,
  prefill = "",
}: EnquiryModalProps) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [form, setForm] = useState<EnquiryFormData>({
    name: "",
    phone: "",
    email: "",
    courseOrBook: prefill || "General Enquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        courseOrBook: prefill || "General Enquiry",
      }));
      setSubmitted(false);
    }
  }, [isOpen, prefill]);

  const mutation = useMutation({
    mutationFn: async (data: EnquiryFormData) => {
      if (!actor) throw new Error("Backend not ready");
      return (actor as unknown as ActorWithSubmit).submitEnquiry(
        data.name,
        data.phone,
        data.email,
        data.courseOrBook,
        data.message,
      );
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] });
    },
  });

  const handleChange = (field: keyof EnquiryFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        phone: "",
        email: "",
        courseOrBook: prefill || "General Enquiry",
        message: "",
      });
      mutation.reset();
    }, 300);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-md w-full" data-ocid="enquiry-modal">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-xl text-foreground">
            {submitted ? "Enquiry Submitted!" : "Enquire Now"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div
            className="text-center py-8 space-y-4"
            data-ocid="enquiry-success"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse-glow">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">
                Thank you, {form.name}!
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                We've received your enquiry for{" "}
                <strong>{form.courseOrBook}</strong>. Rafi Sir's team will
                contact you within 24 hours.
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="w-full font-display font-semibold"
              data-ocid="enquiry-close-btn"
            >
              Close
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="enquiry-form"
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="enq-name"
                className="font-body text-sm font-medium"
              >
                Full Name *
              </Label>
              <Input
                id="enq-name"
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                data-ocid="enquiry-name-input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="enq-phone"
                className="font-body text-sm font-medium"
              >
                Phone Number *
              </Label>
              <Input
                id="enq-phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                data-ocid="enquiry-phone-input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="enq-email"
                className="font-body text-sm font-medium"
              >
                Email Address
              </Label>
              <Input
                id="enq-email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                data-ocid="enquiry-email-input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="enq-course"
                className="font-body text-sm font-medium"
              >
                Course / Book *
              </Label>
              <select
                id="enq-course"
                required
                value={form.courseOrBook}
                onChange={(e) => handleChange("courseOrBook", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                data-ocid="enquiry-course-select"
              >
                {COURSE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="enq-message"
                className="font-body text-sm font-medium"
              >
                Message
              </Label>
              <Textarea
                id="enq-message"
                placeholder="Any specific questions or requirements..."
                rows={3}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                data-ocid="enquiry-message-input"
              />
            </div>

            {mutation.isError && (
              <p className="text-sm text-destructive font-body">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 font-body"
                data-ocid="enquiry-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending || !form.name || !form.phone}
                className="flex-1 font-display font-semibold"
                data-ocid="enquiry-submit-btn"
              >
                {mutation.isPending ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
