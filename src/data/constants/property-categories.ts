export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  count: number;
}

export const propertyCategories: CategoryItem[] = [
  {
    id: 'apartments',
    name: 'Apartments & Penthouses',
    slug: 'apartment',
    subtitle: 'High-Rise & Duplexes',
    description: 'High-rise sky residences, duplex lofts, and garden apartments with panoramic city vistas',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    count: 88,
  },
  {
    id: 'villas',
    name: 'Villas & Private Estates',
    slug: 'villa',
    subtitle: 'Standalone Architectural Homes',
    description: 'Private courtyard residences, tropical modern villas, and gated community sanctuaries',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    count: 34,
  },
  {
    id: 'land',
    name: 'Land & Plots',
    slug: 'plot',
    subtitle: 'Residential & Gated Parcels',
    description: 'Bespoke custom-build plots, corner villa parcels, and private gated residential enclaves',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    count: 42,
  },
  {
    id: 'commercial',
    name: 'Commercial Properties',
    slug: 'commercial',
    subtitle: 'Offices & Showrooms',
    description: 'LEED-certified headquarters, boutique corporate spaces, and premium retail flagships',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    count: 15,
  },
  {
    id: 'agricultural',
    name: 'Agricultural Land',
    slug: 'agricultural',
    subtitle: 'Plantations & Agro-Estates',
    description: 'Organic coffee plantations, avocado groves, fruit orchards, and scenic hill country retreats',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1200&q=80',
    count: 19,
  },
];
