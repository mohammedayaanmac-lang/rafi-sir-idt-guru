import List "mo:core/List";
import CmsLib "../lib/cms";
import Types "../types/cms";

mixin (
  courses : List.List<Types.Course>,
  books : List.List<Types.Book>,
  testimonials : List.List<Types.Testimonial>,
  faqs : List.List<Types.FAQ>,
  achievements : List.List<Types.Achievement>,
  images : List.List<Types.SiteImage>,
  nextCmsId : { var value : Nat },
  contactInfo : { var value : ?Types.ContactInfo },
  heroContent : { var value : ?Types.HeroContent },
) {
  // ── Default data ────────────────────────────────────────────────────────────

  func defaultCourses() : [Types.Course] {
    [
      {
        id = 1;
        name = "CA Inter IDT";
        duration = "4 months";
        price = "Contact for pricing";
        mode = "Online + Offline";
        features = ["GST Fundamentals", "Customs Law", "FTP", "Mock Tests", "Study Material"];
      },
      {
        id = 2;
        name = "CA Final IDT";
        duration = "5 months";
        price = "Contact for pricing";
        mode = "Online + Offline";
        features = ["Advanced GST", "Customs & FTP", "Case Studies", "Mock Tests", "Study Material"];
      },
      {
        id = 3;
        name = "CMA/CS IDT";
        duration = "3 months";
        price = "Contact for pricing";
        mode = "Online + Offline";
        features = ["GST Overview", "Customs Basics", "FTP", "Practice Questions", "Study Material"];
      },
    ];
  };

  func defaultBooks() : [Types.Book] {
    [
      {
        id = 1;
        title = "GST Ready Reckoner";
        subject = "GST";
        edition = "2024 Edition";
        description = "Comprehensive guide covering all aspects of GST for CA/CMA/CS students";
        coverImageId = "";
      },
      {
        id = 2;
        title = "Customs Law & FTP";
        subject = "Customs";
        edition = "2024 Edition";
        description = "Complete reference for Customs Law and Foreign Trade Policy";
        coverImageId = "";
      },
      {
        id = 3;
        title = "IDT Practice Manual";
        subject = "IDT";
        edition = "2024 Edition";
        description = "Practice questions and solutions for Indirect Taxes";
        coverImageId = "";
      },
      {
        id = 4;
        title = "IDT Quick Revision";
        subject = "IDT";
        edition = "2024 Edition";
        description = "Quick revision notes for last-minute exam preparation";
        coverImageId = "";
      },
    ];
  };

  func defaultTestimonials() : [Types.Testimonial] {
    [
      {
        id = 1;
        studentName = "Priya Sharma";
        qualification = "CA Final";
        text = "Rafi Sir's teaching made IDT concepts crystal clear. Cleared CA Final in first attempt!";
        rating = 5;
        isVisible = true;
      },
      {
        id = 2;
        studentName = "Rahul Kumar";
        qualification = "CA Inter";
        text = "Best faculty for GST and Customs. His notes are concise and exam-focused.";
        rating = 5;
        isVisible = true;
      },
      {
        id = 3;
        studentName = "Anitha Reddy";
        qualification = "CMA Final";
        text = "Exceptional clarity in explaining complex GST provisions. Highly recommended!";
        rating = 5;
        isVisible = true;
      },
      {
        id = 4;
        studentName = "Vikram Nair";
        qualification = "CS Executive";
        text = "Sir's structured approach to Customs Law helped me score 80+ in the exam.";
        rating = 5;
        isVisible = true;
      },
      {
        id = 5;
        studentName = "Divya Menon";
        qualification = "CA Inter";
        text = "The mock tests and revision sessions are incredibly helpful. Thank you Rafi Sir!";
        rating = 5;
        isVisible = true;
      },
    ];
  };

  func defaultFAQs() : [Types.FAQ] {
    [
      {
        id = 1;
        question = "What courses do you offer?";
        answer = "We offer IDT (Indirect Tax) coaching for CA Inter, CA Final, CMA, and CS students covering GST, Customs, and Foreign Trade Policy.";
        order = 1;
      },
      {
        id = 2;
        question = "Are classes available online?";
        answer = "Yes, we offer both online and offline classes. Students from anywhere in India can join our online sessions.";
        order = 2;
      },
      {
        id = 3;
        question = "What study materials are provided?";
        answer = "We provide comprehensive study notes, practice questions, mock test papers, and our exclusive books authored by Rafi Sir.";
        order = 3;
      },
      {
        id = 4;
        question = "How can I enroll?";
        answer = "You can enroll by filling out the enquiry form on this website, calling us, or visiting our coaching centre in Chennai.";
        order = 4;
      },
      {
        id = 5;
        question = "What is the batch size?";
        answer = "We maintain small batch sizes to ensure personalized attention. Each batch has a limited number of students for quality learning.";
        order = 5;
      },
    ];
  };

  func defaultContactInfo() : Types.ContactInfo {
    {
      phone = "+91 98765 43210";
      email = "rafisir@idtguru.in";
      location = "Chennai, Tamil Nadu, India";
      hours = "Mon-Sat 9AM-6PM IST";
    };
  };

  // ── Courses ─────────────────────────────────────────────────────────────────

  public query func getCourses() : async [Types.Course] {
    let existing = CmsLib.getCourses(courses);
    if (existing.size() == 0) {
      defaultCourses();
    } else {
      existing;
    };
  };

  public func setCourse(course : Types.Course) : async Nat {
    let assignedId = nextCmsId.value;
    let newNext = CmsLib.setCourse(courses, nextCmsId.value, course);
    nextCmsId.value := newNext;
    // If newNext > assignedId, a new record was created with assignedId
    if (newNext > assignedId) { assignedId } else { course.id };
  };

  public func deleteCourse(id : Nat) : async () {
    CmsLib.deleteCourse(courses, id);
  };

  // ── Books ───────────────────────────────────────────────────────────────────

  public query func getBooks() : async [Types.Book] {
    let existing = CmsLib.getBooks(books);
    if (existing.size() == 0) {
      defaultBooks();
    } else {
      existing;
    };
  };

  public func setBook(book : Types.Book) : async Nat {
    let assignedId = nextCmsId.value;
    let newNext = CmsLib.setBook(books, nextCmsId.value, book);
    nextCmsId.value := newNext;
    if (newNext > assignedId) { assignedId } else { book.id };
  };

  public func deleteBook(id : Nat) : async () {
    CmsLib.deleteBook(books, id);
  };

  // ── Testimonials ─────────────────────────────────────────────────────────────

  public query func getTestimonials() : async [Types.Testimonial] {
    let existing = CmsLib.getTestimonials(testimonials);
    if (existing.size() == 0) {
      defaultTestimonials();
    } else {
      existing;
    };
  };

  public func setTestimonial(testimonial : Types.Testimonial) : async Nat {
    let assignedId = nextCmsId.value;
    let newNext = CmsLib.setTestimonial(testimonials, nextCmsId.value, testimonial);
    nextCmsId.value := newNext;
    if (newNext > assignedId) { assignedId } else { testimonial.id };
  };

  public func deleteTestimonial(id : Nat) : async () {
    CmsLib.deleteTestimonial(testimonials, id);
  };

  // ── FAQs ──────────────────────────────────────────────────────────────────────

  public query func getFAQs() : async [Types.FAQ] {
    let existing = CmsLib.getFAQs(faqs);
    if (existing.size() == 0) {
      defaultFAQs();
    } else {
      existing;
    };
  };

  public func setFAQ(faq : Types.FAQ) : async Nat {
    let assignedId = nextCmsId.value;
    let newNext = CmsLib.setFAQ(faqs, nextCmsId.value, faq);
    nextCmsId.value := newNext;
    if (newNext > assignedId) { assignedId } else { faq.id };
  };

  public func deleteFAQ(id : Nat) : async () {
    CmsLib.deleteFAQ(faqs, id);
  };

  // ── ContactInfo ───────────────────────────────────────────────────────────────

  public query func getContactInfo() : async ?Types.ContactInfo {
    switch (CmsLib.getContactInfo(contactInfo.value)) {
      case null { ?defaultContactInfo() };
      case (?info) { ?info };
    };
  };

  public func setContactInfo(info : Types.ContactInfo) : async () {
    contactInfo.value := ?info;
  };

  // ── Achievements ──────────────────────────────────────────────────────────────

  public query func getAchievements() : async [Types.Achievement] {
    CmsLib.getAchievements(achievements);
  };

  public func setAchievement(achievement : Types.Achievement) : async Nat {
    let assignedId = nextCmsId.value;
    let newNext = CmsLib.setAchievement(achievements, nextCmsId.value, achievement);
    nextCmsId.value := newNext;
    if (newNext > assignedId) { assignedId } else { achievement.id };
  };

  public func deleteAchievement(id : Nat) : async () {
    CmsLib.deleteAchievement(achievements, id);
  };

  // ── HeroContent ───────────────────────────────────────────────────────────────

  public query func getHeroContent() : async ?Types.HeroContent {
    CmsLib.getHeroContent(heroContent.value);
  };

  public func setHeroContent(content : Types.HeroContent) : async () {
    heroContent.value := ?content;
  };

  // ── SiteImages ────────────────────────────────────────────────────────────────

  public query func getSiteImages() : async [Types.SiteImage] {
    CmsLib.getSiteImages(images);
  };

  public func setSiteImage(image : Types.SiteImage) : async Nat {
    let assignedId = nextCmsId.value;
    let newNext = CmsLib.setSiteImage(images, nextCmsId.value, image);
    nextCmsId.value := newNext;
    if (newNext > assignedId) { assignedId } else { image.id };
  };

  public func deleteSiteImage(id : Nat) : async () {
    CmsLib.deleteSiteImage(images, id);
  };
};
