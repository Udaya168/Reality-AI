export interface LocationItem {
  id: string;
  name: string;
  city: string;
  tagline: string;
  image: string;
  listingCount: number;
}

export const featuredLocations: LocationItem[] = [
  {
    id: 'bengaluru-central',
    name: 'Bengaluru Central',
    city: 'Bengaluru',
    tagline: 'Sadashivanagar, Lavelle Road & Defence Colony heritage canopies',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    listingCount: 38
  },
  {
    id: 'whitefield',
    name: 'Whitefield',
    city: 'Bengaluru',
    tagline: 'Expansive private villas, lush ECC road enclaves, and global clubs',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
    listingCount: 45
  },
  {
    id: 'sarjapur',
    name: 'Sarjapur Road',
    city: 'Bengaluru',
    tagline: 'Eco-conscious courtyard residences, lake parcels, and forest sanctuaries',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80',
    listingCount: 29
  },
  {
    id: 'devanahalli',
    name: 'Devanahalli',
    city: 'Bengaluru',
    tagline: 'Nandi Hills airport corridor, organic farm villas, and acreages',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    listingCount: 24
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    city: 'Karnataka',
    tagline: 'Palace vicinity estates, colonial high-plinth bungalows, and tree-lined avenues',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    listingCount: 16
  }
];
