export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  courseOrBook: string;
  message: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  description: string;
  duration: string;
  mode: string;
  features: string[];
  badge?: string;
}

export interface Book {
  id: string;
  title: string;
  subject: string;
  description: string;
  edition: string;
  coverColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  qualification: string;
  attempt: string;
  rating: number;
  review: string;
  initial: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Backend CMS types (matching backend.d.ts)
export interface BackendCourse {
  id: bigint;
  features: string[];
  duration: string;
  mode: string;
  name: string;
  price: string;
}

export interface BackendBook {
  id: bigint;
  title: string;
  edition: string;
  subject: string;
  coverImageId: string;
  description: string;
}

export interface BackendTestimonial {
  id: bigint;
  studentName: string;
  text: string;
  isVisible: boolean;
  rating: bigint;
  qualification: string;
}

export interface BackendFAQ {
  id: bigint;
  question: string;
  order: bigint;
  answer: string;
}

export interface BackendContactInfo {
  hours: string;
  email: string;
  phone: string;
  location: string;
}

export interface BackendAchievement {
  id: bigint;
  title: string;
  value: string;
  icon: string;
}

export interface BackendHeroContent {
  title: string;
  ctaText: string;
  subtitle: string;
}

export interface BackendSiteImage {
  id: bigint;
  url: string;
  name: string;
  section: string;
  uploadedAt: bigint;
}

export interface BackendEnquiry {
  id: bigint;
  name: string;
  email: string;
  message: string;
  courseOrBook: string;
  timestamp: bigint;
  phone: string;
}
