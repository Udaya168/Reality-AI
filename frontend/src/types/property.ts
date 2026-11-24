export type PropertyCategory =
  | 'apartment'
  | 'villa'
  | 'independent-house'
  | 'plot'
  | 'agricultural'
  | 'commercial'
  | 'land'; // alias for plot

export type ListingStatus = 'active' | 'pending' | 'sold' | 'rejected';

export type SellerType = 'Owner' | 'Agent' | 'Builder';

export interface Property {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  category: PropertyCategory;
  price: number; // in INR
  priceDisplay?: string;
  location: {
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  features: {
    areaSqFt: number;
    bedrooms?: number;
    bathrooms?: number;
    balconies?: number;
    furnishing?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
    facing?: 'East' | 'North' | 'North-East' | 'West' | 'South';
    ageOfPropertyYears?: number;
    carParking?: number;
    floorNumber?: number;
    totalFloors?: number;
  };
  amenities: string[];
  images: string[];
  coverImageIndex: number;
  isVerified: boolean;
  isFeatured: boolean;
  status: ListingStatus;
  createdAt: string;
  updatedAt: string;
  seller: {
    id: string;
    name: string;
    type: SellerType;
    phone: string;
    whatsapp: string;
    email: string;
    avatar?: string;
  };
}

export type PropertyFeatures = Property['features'];
export type PropertySeller = Property['seller'];

export interface PropertyFilterState {
  searchQuery: string;
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  bedrooms: string;
  sortBy: 'recent' | 'price-asc' | 'price-desc' | 'area-desc';
}
