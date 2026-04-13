import List "mo:core/List";
import EnquiryLib "../lib/enquiry";
import Types "../types/enquiry";
import EmailClient "mo:caffeineai-email/emailClient";

mixin (enquiries : List.List<Types.Enquiry>, nextId : { var value : Nat }) {

  func buildEmailBody(
    name : Text,
    phone : Text,
    email : Text,
    courseOrBook : Text,
    message : Text,
  ) : Text {
    "<h2 style='color:#1e3a8a;'>New Enquiry – IDT Guru</h2>" #
    "<table style='border-collapse:collapse;width:100%;font-family:sans-serif;'>" #
    "<tr><td style='padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;width:140px;'>Student Name</td>" #
    "<td style='padding:8px 12px;border:1px solid #e5e7eb;'>" # name # "</td></tr>" #
    "<tr><td style='padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;'>Phone</td>" #
    "<td style='padding:8px 12px;border:1px solid #e5e7eb;'>" # phone # "</td></tr>" #
    "<tr><td style='padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;'>Email</td>" #
    "<td style='padding:8px 12px;border:1px solid #e5e7eb;'>" # email # "</td></tr>" #
    "<tr><td style='padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;'>Course / Book</td>" #
    "<td style='padding:8px 12px;border:1px solid #e5e7eb;'>" # courseOrBook # "</td></tr>" #
    "<tr><td style='padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;'>Message</td>" #
    "<td style='padding:8px 12px;border:1px solid #e5e7eb;'>" # message # "</td></tr>" #
    "</table>" #
    "<p style='color:#6b7280;margin-top:16px;font-family:sans-serif;font-size:13px;'>" #
    "Submitted via the IDT Guru website.</p>";
  };

  public func submitEnquiry(
    name : Text,
    phone : Text,
    email : Text,
    courseOrBook : Text,
    message : Text,
  ) : async () {
    nextId.value := EnquiryLib.submit(enquiries, nextId.value, name, phone, email, courseOrBook, message);
    // Fire-and-forget email notification — never let email failure break enquiry storage
    try {
      ignore await EmailClient.sendServiceEmail(
        "idtguru",
        ["rafigowsi@gmail.com"],
        "New Enquiry: " # courseOrBook,
        buildEmailBody(name, phone, email, courseOrBook, message),
      );
    } catch (_) {};
  };

  public query func getEnquiries() : async [Types.Enquiry] {
    EnquiryLib.getAll(enquiries);
  };
};
