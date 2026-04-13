import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    id: bigint;
    studentName: string;
    text: string;
    isVisible: boolean;
    rating: bigint;
    qualification: string;
}
export interface FAQ {
    id: bigint;
    question: string;
    order: bigint;
    answer: string;
}
export type Timestamp = bigint;
export interface Achievement {
    id: bigint;
    title: string;
    value: string;
    icon: string;
}
export interface HeroContent {
    title: string;
    ctaText: string;
    subtitle: string;
}
export interface SiteImage {
    id: bigint;
    url: string;
    name: string;
    section: string;
    uploadedAt: Timestamp;
}
export interface Book {
    id: bigint;
    title: string;
    edition: string;
    subject: string;
    coverImageId: string;
    description: string;
}
export interface Enquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    courseOrBook: string;
    timestamp: Timestamp;
    phone: string;
}
export interface ContactInfo {
    hours: string;
    email: string;
    phone: string;
    location: string;
}
export interface Course {
    id: bigint;
    features: Array<string>;
    duration: string;
    mode: string;
    name: string;
    price: string;
}
export interface backendInterface {
    deleteAchievement(id: bigint): Promise<void>;
    deleteBook(id: bigint): Promise<void>;
    deleteCourse(id: bigint): Promise<void>;
    deleteFAQ(id: bigint): Promise<void>;
    deleteSiteImage(id: bigint): Promise<void>;
    deleteTestimonial(id: bigint): Promise<void>;
    getAchievements(): Promise<Array<Achievement>>;
    getBooks(): Promise<Array<Book>>;
    getContactInfo(): Promise<ContactInfo | null>;
    getCourses(): Promise<Array<Course>>;
    getEnquiries(): Promise<Array<Enquiry>>;
    getFAQs(): Promise<Array<FAQ>>;
    getHeroContent(): Promise<HeroContent | null>;
    getSiteImages(): Promise<Array<SiteImage>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    setAchievement(achievement: Achievement): Promise<bigint>;
    setBook(book: Book): Promise<bigint>;
    setContactInfo(info: ContactInfo): Promise<void>;
    setCourse(course: Course): Promise<bigint>;
    setFAQ(faq: FAQ): Promise<bigint>;
    setHeroContent(content: HeroContent): Promise<void>;
    setSiteImage(image: SiteImage): Promise<bigint>;
    setTestimonial(testimonial: Testimonial): Promise<bigint>;
    submitEnquiry(name: string, phone: string, email: string, courseOrBook: string, message: string): Promise<void>;
}
