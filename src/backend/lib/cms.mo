import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/cms";

module {
  public type Course = Types.Course;
  public type Book = Types.Book;
  public type Testimonial = Types.Testimonial;
  public type FAQ = Types.FAQ;
  public type ContactInfo = Types.ContactInfo;
  public type Achievement = Types.Achievement;
  public type HeroContent = Types.HeroContent;
  public type SiteImage = Types.SiteImage;

  // ── Generic upsert/delete helpers ──────────────────────────────────────────

  // Returns the new nextId value after upsert.
  // If item.id == 0 AND nextId == 0 it means "fresh insert with id = nextId".
  // Caller must pass the *current* nextId; if the item.id equals an existing
  // record's id we update in place, otherwise we append (using nextId as id).

  // ── Courses ────────────────────────────────────────────────────────────────

  public func getCourses(courses : List.List<Course>) : [Course] {
    courses.toArray();
  };

  // Returns the next available id after the operation.
  public func setCourse(courses : List.List<Course>, nextId : Nat, course : Course) : Nat {
    // Try update existing
    let existing = courses.findIndex(func(c) { c.id == course.id });
    switch (existing) {
      case (?idx) {
        courses.put(idx, course);
        nextId;
      };
      case null {
        courses.add({ course with id = nextId });
        nextId + 1;
      };
    };
  };

  public func deleteCourse(courses : List.List<Course>, id : Nat) {
    let idx = courses.findIndex(func(c) { c.id == id });
    switch (idx) {
      case (?i) {
        let last = courses.size() - 1;
        if (i < last) {
          courses.put(i, courses.at(last));
        };
        ignore courses.removeLast();
      };
      case null {};
    };
  };

  // ── Books ──────────────────────────────────────────────────────────────────

  public func getBooks(books : List.List<Book>) : [Book] {
    books.toArray();
  };

  public func setBook(books : List.List<Book>, nextId : Nat, book : Book) : Nat {
    let existing = books.findIndex(func(b) { b.id == book.id });
    switch (existing) {
      case (?idx) {
        books.put(idx, book);
        nextId;
      };
      case null {
        books.add({ book with id = nextId });
        nextId + 1;
      };
    };
  };

  public func deleteBook(books : List.List<Book>, id : Nat) {
    let idx = books.findIndex(func(b) { b.id == id });
    switch (idx) {
      case (?i) {
        let last = books.size() - 1;
        if (i < last) { books.put(i, books.at(last)) };
        ignore books.removeLast();
      };
      case null {};
    };
  };

  // ── Testimonials ───────────────────────────────────────────────────────────

  public func getTestimonials(testimonials : List.List<Testimonial>) : [Testimonial] {
    testimonials.toArray();
  };

  public func setTestimonial(testimonials : List.List<Testimonial>, nextId : Nat, testimonial : Testimonial) : Nat {
    let existing = testimonials.findIndex(func(t) { t.id == testimonial.id });
    switch (existing) {
      case (?idx) {
        testimonials.put(idx, testimonial);
        nextId;
      };
      case null {
        testimonials.add({ testimonial with id = nextId });
        nextId + 1;
      };
    };
  };

  public func deleteTestimonial(testimonials : List.List<Testimonial>, id : Nat) {
    let idx = testimonials.findIndex(func(t) { t.id == id });
    switch (idx) {
      case (?i) {
        let last = testimonials.size() - 1;
        if (i < last) { testimonials.put(i, testimonials.at(last)) };
        ignore testimonials.removeLast();
      };
      case null {};
    };
  };

  // ── FAQs ───────────────────────────────────────────────────────────────────

  public func getFAQs(faqs : List.List<FAQ>) : [FAQ] {
    faqs.toArray();
  };

  public func setFAQ(faqs : List.List<FAQ>, nextId : Nat, faq : FAQ) : Nat {
    let existing = faqs.findIndex(func(f) { f.id == faq.id });
    switch (existing) {
      case (?idx) {
        faqs.put(idx, faq);
        nextId;
      };
      case null {
        faqs.add({ faq with id = nextId });
        nextId + 1;
      };
    };
  };

  public func deleteFAQ(faqs : List.List<FAQ>, id : Nat) {
    let idx = faqs.findIndex(func(f) { f.id == id });
    switch (idx) {
      case (?i) {
        let last = faqs.size() - 1;
        if (i < last) { faqs.put(i, faqs.at(last)) };
        ignore faqs.removeLast();
      };
      case null {};
    };
  };

  // ── ContactInfo (singleton) ────────────────────────────────────────────────

  public func getContactInfo(contactInfo : ?ContactInfo) : ?ContactInfo {
    contactInfo;
  };

  // ── Achievements ───────────────────────────────────────────────────────────

  public func getAchievements(achievements : List.List<Achievement>) : [Achievement] {
    achievements.toArray();
  };

  public func setAchievement(achievements : List.List<Achievement>, nextId : Nat, achievement : Achievement) : Nat {
    let existing = achievements.findIndex(func(a) { a.id == achievement.id });
    switch (existing) {
      case (?idx) {
        achievements.put(idx, achievement);
        nextId;
      };
      case null {
        achievements.add({ achievement with id = nextId });
        nextId + 1;
      };
    };
  };

  public func deleteAchievement(achievements : List.List<Achievement>, id : Nat) {
    let idx = achievements.findIndex(func(a) { a.id == id });
    switch (idx) {
      case (?i) {
        let last = achievements.size() - 1;
        if (i < last) { achievements.put(i, achievements.at(last)) };
        ignore achievements.removeLast();
      };
      case null {};
    };
  };

  // ── HeroContent (singleton) ────────────────────────────────────────────────

  public func getHeroContent(heroContent : ?HeroContent) : ?HeroContent {
    heroContent;
  };

  // ── SiteImages ─────────────────────────────────────────────────────────────

  public func getSiteImages(images : List.List<SiteImage>) : [SiteImage] {
    images.toArray();
  };

  public func setSiteImage(images : List.List<SiteImage>, nextId : Nat, image : SiteImage) : Nat {
    let existing = images.findIndex(func(img) { img.id == image.id });
    switch (existing) {
      case (?idx) {
        images.put(idx, image);
        nextId;
      };
      case null {
        images.add({ image with id = nextId; uploadedAt = Time.now() });
        nextId + 1;
      };
    };
  };

  public func deleteSiteImage(images : List.List<SiteImage>, id : Nat) {
    let idx = images.findIndex(func(img) { img.id == id });
    switch (idx) {
      case (?i) {
        let last = images.size() - 1;
        if (i < last) { images.put(i, images.at(last)) };
        ignore images.removeLast();
      };
      case null {};
    };
  };
};
