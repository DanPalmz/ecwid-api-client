export interface ProductType {
  id: number;
  name?: string;
  googleTaxonomy?: string;
  attributes?: Attribute[];
}

interface Attribute {
  id: number;
  name?: string;
  type?: string;
  show?: string;
}
