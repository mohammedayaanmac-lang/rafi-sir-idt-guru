import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/enquiry";

module {
  public type Enquiry = Types.Enquiry;

  public func submit(
    enquiries : List.List<Enquiry>,
    nextId : Nat,
    name : Text,
    phone : Text,
    email : Text,
    courseOrBook : Text,
    message : Text,
  ) : Nat {
    let enquiry : Enquiry = {
      id = nextId;
      name;
      phone;
      email;
      courseOrBook;
      message;
      timestamp = Time.now();
    };
    enquiries.add(enquiry);
    nextId + 1;
  };

  public func getAll(enquiries : List.List<Enquiry>) : [Enquiry] {
    enquiries.toArray();
  };
};
