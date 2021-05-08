export interface Customer {
  id?: number;
  name?: string;
  email?: string;
  registered?: string;
  updated?: string;
  totalOrderCount?: number;
  customerGroupId?: number;
  customerGroupName?: string;
  billingPerson?: Person;
  shippingAddresses?: ShippingAddress[];
  taxId?: string;
  taxExempt?: boolean;
  taxIdValid?: boolean;
  acceptMarketing?: boolean;
}

export interface Person {
  name?: string;
  companyName?: string;
  street?: string;
  city?: string;
  countryCode?: string;
  countryName?: string;
  postalCode?: string;
  stateOrProvinceCode?: string;
  stateOrProvinceName?: string;
  phone?: string;
}

interface ShippingAddress extends Person {
  id?: number;
}
