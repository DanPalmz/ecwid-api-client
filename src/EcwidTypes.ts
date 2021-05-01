export interface SearchResult<T> {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: T[];
}

// const myTestSearch: SearchResult<Partial<Product>> = {
//   total: 1,
//   count: 1,
//   offset: 0,
//   limit: 100,
//   items: [{ created: "123" }],
// };

export interface Product {
  attributes?: AttributeValue[];
  borderInfo?: BorderInfo; // Not in Docs
  categories?: CategoriesInfo[];
  categoryIds?: number[];
  combinations?: Variation[];
  compareToPrice?: number;
  compareToPriceDiscount?: number;
  compareToPriceDiscountFormatted?: string;
  compareToPriceDiscountPercent?: number;
  compareToPriceDiscountPercentFormatted?: string;
  compareToPriceFormatted?: string;
  createTimestamp?: number;
  created?: string;
  defaultCategoryId?: number;
  defaultCombinationId?: number;
  defaultDisplayedPrice?: number;
  defaultDisplayedPriceFormatted?: string;
  description?: string;
  descriptionTranslated?: Translations;
  dimensions?: ProductDimensions;
  discountsAllowed?: boolean;
  enabled?: boolean;
  files?: ProductFile[];
  fixedShippingRate?: number;
  fixedShippingRateOnly?: boolean;
  galleryImages?: GalleryImages[]; // Not in Docs
  googleItemCondition?: string; // Not in Docs
  hdThumbnailUrl?: string; // Not in Docs
  id: number;
  imageUrl?: string; // Not in Docs
  inStock?: boolean;
  isGiftCard?: boolean;
  isSampleProduct?: boolean;
  isShippingRequired?: boolean;
  media?: ProductMedia;
  name?: string;
  nameTranslated?: Translations;
  nameYourPriceEnabled?: boolean;
  options?: ProductOption[];
  originalImage?: OriginalImage; // Not in Docs
  originalImageUrl?: string; // Not in Docs
  price?: number;
  priceInProductList?: number; // Not in Docs
  productClassId?: number;
  productCondition?: string; // Not in Docs
  relatedProducts?: RelatedProducts;
  seoDescription?: string;
  seoTitle?: string;
  shipping?: ShippingSettings;
  showOnFrontpage?: number;
  sku?: string;
  smallThumbnailUrl?: string; // Not in Docs
  tax?: TaxInfo;
  thumbnailUrl?: string; // Not in Docs
  unlimited?: boolean;
  updateTimestamp?: number;
  updated?: string; // Not in Docs
  url?: string;
  warningLimit?: number;
  weight?: number;
  wholesalePrices?: WholesalePrice[];
}

interface OptionValue {
  nameTranslated?: Translations;
  value?: string;
  valueTranslated?: Translations;
}

interface CategoriesInfo {
  id: number;
  enabled?: boolean;
}

interface ProductFile {
  id: number;
  name: string;
  description: string;
  size: number;
  adminUrl: string;
}

interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
}

interface Variation {
  id: number;
  combinationNumber?: number;
  options?: OptionValue[];
  sku?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  smallThumbnailUrl?: string;
  hdThumbnailUrl?: string;
  originalImageUrl?: string;
  quantity?: number;
  unlimited?: boolean;
  price?: number;
  wholesalePrices?: WholesalePrice[];
  weight?: number;
  warningLimit?: number;
  attributes?: AttributeValue[];
  compareToPrice?: number;
}

interface WholesalePrice {
  quantity: number;
  price: number;
}

interface Translations {
  [key: string]: string;
}

interface TaxInfo {
  taxable?: boolean;
  enabledManualTaxes: number[];
  defaultLocationIncludedTaxRate?: number;
}

interface ShippingSettings {
  type?: "GLOBAL_METHODS" | "SELECTED_METHODS" | "FLAT_RATE" | "FREE_SHIPPING";
  methodMarkup?: number;
  flatRate?: number;
  disabledMethods?: number[];
  enabledMethods?: number[];
}

interface OriginalImage {
  url?: string;
  width?: number;
  height?: number;
}

interface BorderInfo {
  dominatingColor?: DominatingColor;
  homogeneity?: boolean;
}

interface DominatingColor {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number;
}

interface ProductMedia {
  images?: ProductImage[];
}

interface ProductImage {
  id: string;
  isMain?: boolean;
  orderBy?: number;
  image160pxUrl?: string;
  image400pxUrl?: string;
  image800pxUrl?: string;
  image1500pxUrl?: string;
  imageOriginalUrl?: string;
}

interface RelatedProducts {
  productIds?: number[];
  relatedCategory?: RelatedCategory;
}

interface RelatedCategory {
  enabled?: boolean;
  categoryId?: number;
  productCount?: number;
}

interface ProductOption {
  type:
    | "SELECT"
    | "RADIO"
    | "CHECKBOX"
    | "TEXTFIELD"
    | "TEXTAREA"
    | "DATE"
    | "FILES"
    | "SIZE";
  name?: string;
  nameTranslated?: Translations;
  choices?: ProductOptionChoice[];
  defaultChoice?: number;
  required?: boolean;
}

interface ProductOptionChoice {
  text?: string;
  textTranslated?: Translations;
  priceModifier?: number;
  priceModifierType?: "PERCENT" | "ABSOLUTE";
}

interface GalleryImages {
  id?: number;
  url?: string;
  thumbnail?: string;
  originalImageUrl?: string;
  imageUrl?: string;
  hdThumbnailUrl?: string;
  thumbnailUrl?: string;
  smallThumbnailUrl?: string;
  width?: number;
  height?: number;
  orderBy?: number;
  borderInfo?: BorderInfo;
}

interface AttributeValue {
  id?: number;
  name?: string;
  value?: string;
  show?: string;
  type?:
    | "CUSTOM"
    | "UPC"
    | "BRAND"
    | "GENDER"
    | "AGE_GROUP"
    | "COLOR"
    | "SIZE"
    | "PRICE_PER_UNIT"
    | "UNITS_IN_PRODUCT";
}
