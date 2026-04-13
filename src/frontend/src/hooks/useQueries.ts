import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Achievement,
  Book,
  ContactInfo,
  Course,
  Enquiry,
  FAQ,
  HeroContent,
  SiteImage,
  Testimonial,
} from "../backend.d.ts";

const QUERY_OPTIONS = {
  staleTime: 0,
  refetchInterval: 5000,
} as const;

// ── Queries ───────────────────────────────────────────────────────────────────

export function useHeroContent() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HeroContent | null>({
    queryKey: ["hero-content"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHeroContent();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useSiteImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SiteImage[]>({
    queryKey: ["site-images"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSiteImages();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useCourses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCourses();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useBooks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBooks();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useAchievements() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Achievement[]>({
    queryKey: ["achievements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAchievements();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useFAQs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFAQs();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useContactInfo() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ContactInfo | null>({
    queryKey: ["contact-info"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
    ...QUERY_OPTIONS,
  });
}

export function useEnquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Enquiry[]>({
    queryKey: ["enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnquiries();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useSetCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (course: Course) => {
      if (!actor) throw new Error("No actor");
      return actor.setCourse(course);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useDeleteCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteCourse(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useSetBook() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (book: Book) => {
      if (!actor) throw new Error("No actor");
      return actor.setBook(book);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}

export function useDeleteBook() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteBook(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}

export function useSetTestimonial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (t: Testimonial) => {
      if (!actor) throw new Error("No actor");
      return actor.setTestimonial(t);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useSetFAQ() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (faq: FAQ) => {
      if (!actor) throw new Error("No actor");
      return actor.setFAQ(faq);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

export function useDeleteFAQ() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteFAQ(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

export function useSetContactInfo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (info: ContactInfo) => {
      if (!actor) throw new Error("No actor");
      return actor.setContactInfo(info);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-info"] }),
  });
}

export function useSetAchievement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (a: Achievement) => {
      if (!actor) throw new Error("No actor");
      return actor.setAchievement(a);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["achievements"] }),
  });
}

export function useDeleteAchievement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteAchievement(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["achievements"] }),
  });
}

export function useSetHeroContent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: HeroContent) => {
      if (!actor) throw new Error("No actor");
      return actor.setHeroContent(content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hero-content"] }),
  });
}

export function useSetSiteImage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (img: SiteImage) => {
      if (!actor) throw new Error("No actor");
      return actor.setSiteImage(img);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-images"] }),
  });
}

export function useDeleteSiteImage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteSiteImage(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-images"] }),
  });
}
