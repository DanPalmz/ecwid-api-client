import { Person as PersonInfo } from "./Customer";

export interface OrderEntry {
  id: string;
  subtotal?: number;
  total?: number;
  usdTotal?: number;
  tax?: number;
  paymentMethod?: string;
  paymentStatus?:
    | "AWAITING_PAYMENT"
    | "PAID"
    | "CANCELLED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED"
    | "INCOMPLETE";
  fulfillmentStatus?:
    | "AWAITING_PAYMENT"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "WILL_NOT_DELIVER"
    | "RETURNED"
    | "READY_FOR_PICKUP"
    | "OUT_FOR_DELIVERY";
  vendorOrderNumber?: string;
  orderNumber?: number;
  refererUrl?: string;
  globalReferer?: string;
  createDate?: Date;
  updateDate?: Date;
  createTimestamp?: number;
  updateTimestamp?: number;
  hidden?: boolean;
  orderComments?: string;
  privateAdminNotes?: string;
  email?: string;
  ipAddress?: string;
  customerId?: number;
  customerGroupId?: number;
  customerGroup?: string;
  customerTaxExempt?: boolean;
  customerTaxId?: string;
  customerTaxIdValid?: boolean;
  reversedTaxApplied?: boolean;
  discount?: number;
  couponDiscount?: number;
  volumeDiscount?: number;
  membershipBasedDiscount?: number;
  totalAndMembershipBasedDiscount?: number;
  discountCoupon?: DiscountCouponInfo;
  discountInfo?: DiscountInfo[];
  items?: OrderItem[];
  refundedAmount?: number;
  refunds?: RefundsInfo[];
  billingPerson?: PersonInfo;
  shippingPerson?: PersonInfo;
  shippingOption?: ShippingOptionInfo;
  handlingFee?: HandlingFeeInfo;
  predictedPackage?: PredictedPackage;
  taxesOnShipping?: TaxOnShipping[];
  paymentModule?: string;
  paymentParams?: Record<string, string>;
  additionalInfo?: Record<string, string>;
  orderExtraFields?: OrderExtraFields[];
  acceptMarketing?: boolean;
  refererId?: string;
  disableAllCustomerNotifications?: boolean;
  externalFulfillment?: boolean;
  trackingNumber?: string;
  paymentMessage?: string;
  externalTransactionId?: string;
  affiliateId?: string;
  creditCardStatus?: CreditCardStatus;
  externalOrderId?: string;
}

interface DiscountCouponInfo {
  id?: number;
  name?: string;
  code?: string;
  discountType?:
    | "ABS"
    | "PERCENT"
    | "SHIPPING"
    | "ABS_AND_SHIPPING"
    | "PERCENT_AND_SHIPPING";
  status?: "ACTIVE" | "PAUSED" | "EXPIRED" | "USEDUP";
  discount?: number;
  launchDate?: string;
  expirationDate: string;
  usesLimit?: string;
  applicationLimit?: string;
  creationDate?: string;
  updateDate?: string;
  orderCount?: number;
  catalogLimit?: DiscountCouponCatalogLimit;
}

interface DiscountCouponCatalogLimit {
  products?: number[];
  categories?: number[];
}

interface ShippingOptionInfo {
  shippingCarrierName?: string;
  shippingMethodName?: string;
  shippingRate?: number;
  estimatedTransitTime?: string;
  isPickup?: boolean;
  pickupInstruction?: string;
  fulfillmentType: "shipping" | "pickup" | "delivery"; // Lowercase in docs - CHECK!
}

interface HandlingFeeInfo {
  name?: string;
  value?: number;
  description?: string;
}

interface DiscountInfo {
  value?: number;
  type?: "ABS" | "PERCENT";
  base?: "ON_TOTAL" | "ON_MEMBERSHIP" | "ON_TOTAL_AND_MEMBERSHIP" | "CUSTOM";
  orderTotal?: number;
  description?: string;
}

interface OrderItem {
  categoryId?: number;
  couponAmount?: number;
  couponApplied?: boolean;
  digital?: boolean;
  dimensions?: Dimensions;
  discounts?: Discounts[];
  fixedShippingRate?: number;
  fixedShippingRateOnly?: boolean;
  hdThumbnailUrl?: string;
  id?: number;
  imageUrl?: string;
  isShippingRequired?: boolean;
  name?: string;
  price?: number;
  productId?: number;
  productPrice?: number;
  quantity?: number;
  quantityInStock?: number;
  selectedOptions?: SelectedOptions[];
  shipping?: number;
  shortDescription?: string;
  sku?: string;
  smallThumbnailUrl?: string;
  tax?: number;
  taxes?: Taxes[];
  trackQuantity?: boolean;
  weight?: number;
}

interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

interface SelectedOptions {
  name?: string;
  value?: string;
  valuesArray?: string[];
  selections?: Selections[];
  type?: string;
}

interface Selections {
  selectionTitle?: string;
  selectionModifier?: number;
  selectionModifierType?: string;
}

interface Taxes {
  name?: string;
  value?: number;
  total?: number;
  taxOnDiscountedSubtotal?: number;
  taxOnShipping?: number;
  includeInPrice?: boolean;
}

interface TaxOnShipping {
  name?: string;
  value?: number;
  total?: number;
}

interface Discounts {
  discountInfo?: DiscountInfo;
  total?: number;
}

interface RefundsInfo {
  date?: Date;
  source?: string;
  reason?: string;
  amount?: number;
}

interface PredictedPackage {
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  declaredValue?: number;
}

interface OrderExtraFields {
  id?: string;
  value?: string;
  customerInputType?: string;
  title?: string;
  orderDetailsDisplaySection?: string;
  orderBy?: string;
}

interface CreditCardStatus {
  avsMessage: string;
  cvvMessage: string;
}
