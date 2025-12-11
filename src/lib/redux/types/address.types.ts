export enum AddressType {
  home = "home",
  office = "office",
  other = "other",
}

export interface Address {
  _id: string;
  addressType: AddressType;
  lineOne: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
