import Common "common";

module {
  public type Timestamp = Common.Timestamp;

  public type Course = {
    id : Nat;
    name : Text;
    duration : Text;
    price : Text;
    mode : Text;
    features : [Text];
  };

  public type Book = {
    id : Nat;
    title : Text;
    subject : Text;
    edition : Text;
    description : Text;
    coverImageId : Text;
  };

  public type Testimonial = {
    id : Nat;
    studentName : Text;
    qualification : Text;
    text : Text;
    rating : Nat;
    isVisible : Bool;
  };

  public type FAQ = {
    id : Nat;
    question : Text;
    answer : Text;
    order : Nat;
  };

  public type ContactInfo = {
    phone : Text;
    email : Text;
    location : Text;
    hours : Text;
  };

  public type Achievement = {
    id : Nat;
    title : Text;
    value : Text;
    icon : Text;
  };

  public type HeroContent = {
    title : Text;
    subtitle : Text;
    ctaText : Text;
  };

  public type SiteImage = {
    id : Nat;
    name : Text;
    url : Text;
    section : Text;
    uploadedAt : Timestamp;
  };
};
