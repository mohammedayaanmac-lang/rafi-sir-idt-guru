import Common "common";

module {
  public type Timestamp = Common.Timestamp;

  public type Enquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    courseOrBook : Text;
    message : Text;
    timestamp : Timestamp;
  };
};
