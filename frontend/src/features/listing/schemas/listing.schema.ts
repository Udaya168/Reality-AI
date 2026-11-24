export interface ListingFormData {
  propertyType: string;
  title: string;
  description: string;
  price: string;
  area: string;
  areaUnit: string;
  bedrooms: string;
  bathrooms: string;
  facing: string;
  propertyAge: string;
  amenities: string[];
  state: string;
  city: string;
  locality: string;
  pincode: string;
  address: string;
  images: Array<{ id: string; url: string; name: string; isCover?: boolean }>;
  sellerName: string;
  sellerPhone: string;
  whatsappNumber: string;
  sellerType: 'Owner' | 'Agent' | 'Builder';
}
