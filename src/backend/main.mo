import List "mo:core/List";
import EnquiryTypes "types/enquiry";
import CmsTypes "types/cms";
import EnquiryMixin "mixins/enquiry-api";
import CmsMixin "mixins/cms-api";

actor {
  // Enquiry state
  let enquiries = List.empty<EnquiryTypes.Enquiry>();
  var nextId : { var value : Nat } = { var value = 0 };

  // CMS state
  let courses = List.empty<CmsTypes.Course>();
  let books = List.empty<CmsTypes.Book>();
  let testimonials = List.empty<CmsTypes.Testimonial>();
  let faqs = List.empty<CmsTypes.FAQ>();
  let achievements = List.empty<CmsTypes.Achievement>();
  let images = List.empty<CmsTypes.SiteImage>();
  var nextCmsId : { var value : Nat } = { var value = 0 };
  var contactInfo : { var value : ?CmsTypes.ContactInfo } = { var value = null };
  var heroContent : { var value : ?CmsTypes.HeroContent } = { var value = null };

  include EnquiryMixin(enquiries, nextId);
  include CmsMixin(courses, books, testimonials, faqs, achievements, images, nextCmsId, contactInfo, heroContent);
};
