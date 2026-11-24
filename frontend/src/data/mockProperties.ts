import { Property } from '../types/property';

export const DEFAULT_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'The Courtyard Villa at Sadashivanagar',
    tagline: 'Modern tropical architecture designed with reclaimed teak and central rain-court',
    description: 'An architectural masterpiece in the quiet, tree-lined avenues of Sadashivanagar. Features double-height living spaces, floor-to-ceiling glass pavilions opening onto private landscaped courtyards, and a curated rooftop lap pool with views of Bangalore Palace grounds.\n\nDesigned by leading tropical modernists, every room is naturally cross-ventilated with thermal mass walls that maintain a cool internal microclimate throughout the year.',
    category: 'villa',
    price: 185000000, // 18.5 Cr
    priceDisplay: '₹18.5 Cr',
    location: {
      address: 'Plot 42, 5th Cross, Sadashivanagar',
      locality: 'Sadashivanagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560080'
    },
    features: {
      areaSqFt: 6200,
      bedrooms: 4,
      bathrooms: 5,
      balconies: 3,
      furnishing: 'Semi-Furnished',
      facing: 'East',
      ageOfPropertyYears: 1,
      carParking: 4,
      floorNumber: 0,
      totalFloors: 3
    },
    amenities: [
      'Private Lap Pool',
      'Double Height Ceiling',
      'Landscaped Rain Courtyard',
      'Lutron Home Automation',
      'EV Charging Station',
      'Solar Heated Water Grid',
      'Staff Quarters & Driver Lounge',
      'Water Softener & RO Plant'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-18T09:00:00Z',
    updatedAt: '2025-02-20T12:00:00Z',
    seller: {
      id: 'sel-1',
      name: 'Rohan Kothari',
      type: 'Owner',
      phone: '+91 98450 12890',
      whatsapp: '+919845012890',
      email: 'rohan.kothari@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'prop-2',
    title: 'Penthouse Panorama at Defence Colony',
    tagline: 'Refined duplex penthouse with 270-degree canopy horizons and private wraparound terrace',
    description: 'Perched high above Indiranagar Defence Colony, this duplex residence seamlessly blends brutalist concrete textures with warm brass and oak accents. Complete with a private plunge pool, skylit master retreat, and seamless smart-home connectivity.\n\nThe upper level opens to an expansive private terrace entertainment deck with custom timber pergola and outdoor fireplace.',
    category: 'apartment',
    price: 92000000, // 9.2 Cr
    priceDisplay: '₹9.2 Cr',
    location: {
      address: 'Regency Heights, 12th Main, Defence Colony',
      locality: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    features: {
      areaSqFt: 4400,
      bedrooms: 4,
      bathrooms: 4,
      balconies: 4,
      furnishing: 'Fully Furnished',
      facing: 'North-East',
      ageOfPropertyYears: 2,
      carParking: 3,
      floorNumber: 14,
      totalFloors: 14
    },
    amenities: [
      'Wraparound Sky Terrace',
      'Private Plunge Pool',
      'Concierge Service & Valet',
      'Private Club & Wellness Gym',
      '24/7 Monitored CCTV Security',
      '100% Dual Power Backup'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-19T11:30:00Z',
    updatedAt: '2025-02-21T14:00:00Z',
    seller: {
      id: 'sel-2',
      name: 'Aditi Varma',
      type: 'Agent',
      phone: '+91 99801 44550',
      whatsapp: '+919980144550',
      email: 'aditi.varma@primeproperties.in',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'prop-3',
    title: 'The Orchard Estate Parcel — Devanahalli',
    tagline: '1.5-acre manicured agro-residential plot with avocado grove and private sweetwater borewell',
    description: 'An idyllic retreat situated 15 minutes north of Kempegowda International Airport. Gated community with paved tree-lined internal roads, fully organic soil profile, established drip irrigation, and clear title approvals for farm villa construction.\n\nSurrounded by views of the Nandi Hills foothills, this parcel combines peaceful rural seclusion with seamless highway connectivity to Bangalore city center.',
    category: 'plot',
    price: 36000000, // 3.6 Cr
    priceDisplay: '₹3.6 Cr',
    location: {
      address: 'Survey 88, Near Nandi Hills Road',
      locality: 'Devanahalli',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '562110'
    },
    features: {
      areaSqFt: 65340, // 1.5 acres
      facing: 'North',
      carParking: 10
    },
    amenities: [
      'Gated Community Boundary',
      '24/7 Gated Security Patrol',
      'Solar Powered Perimeter Fence',
      'Sweet Water High-Yield Borewell',
      'Direct Highway Frontage Access',
      'Underground Electricity Grid'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-15T08:15:00Z',
    updatedAt: '2025-02-17T08:15:00Z',
    seller: {
      id: 'sel-3',
      name: 'Naveen Someshwar',
      type: 'Owner',
      phone: '+91 97412 88991',
      whatsapp: '+919741288991',
      email: 'naveen.agro@gmail.com'
    }
  },
  {
    id: 'prop-4',
    title: 'The Glasshouse Sanctuary — Whitefield',
    tagline: 'Minimalist contemporary villa overlooking private Zen gardens and infinity water bodies',
    description: 'Nestled in a serene cul-de-sac off ECC Road, this bespoke 5-bedroom home offers floor-to-ceiling thermal glazing, imported Italian marble, dual show and wet kitchens, an infinity-edge koi pond, and a private media screening suite.\n\nEvery structural line is engineered with cast architectural concrete and anodised bronze louvers, offering complete privacy while welcoming abundant natural light.',
    category: 'villa',
    price: 145000000, // 14.5 Cr
    priceDisplay: '₹14.5 Cr',
    location: {
      address: 'ECC Road, Near Windmills Craftworks',
      locality: 'Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066'
    },
    features: {
      areaSqFt: 5800,
      bedrooms: 5,
      bathrooms: 6,
      balconies: 3,
      furnishing: 'Semi-Furnished',
      facing: 'East',
      ageOfPropertyYears: 0,
      carParking: 3,
      floorNumber: 0,
      totalFloors: 2
    },
    amenities: [
      'Private Zen Garden',
      '4K Dolby Atmos Home Theatre',
      'Infinity Koi Pond & Water Court',
      'Daikin VRV Smart HVAC',
      '10KW Solar Grid System',
      'Prestige Signature Club Access'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-21T10:00:00Z',
    updatedAt: '2025-02-22T14:30:00Z',
    seller: {
      id: 'sel-4',
      name: 'Prestige Signature Realty',
      type: 'Builder',
      phone: '+91 80 4123 9000',
      whatsapp: '+918041239000',
      email: 'concierge@prestigesignature.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'prop-5',
    title: 'The Linear Studio Loft — Lavelle Road',
    tagline: 'Boutique residential loft with exposed brickwork, black steel and bespoke millwork',
    description: 'An exceptional downtown dwelling steps away from UB City and Cubbon Park. Designed for the design purist, boasting 14-foot exposed ceilings, chevron oak flooring, and custom cast-bronze fittings.\n\nLarge industrial warehouse-style windows frame leafy views of heritage Gulmohar trees in one of Bangalore most prestigious enclaves.',
    category: 'apartment',
    price: 48000000, // 4.8 Cr
    priceDisplay: '₹4.8 Cr',
    location: {
      address: 'Lavelle Road, Near Cubbon Park',
      locality: 'Lavelle Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001'
    },
    features: {
      areaSqFt: 2200,
      bedrooms: 2,
      bathrooms: 2,
      balconies: 2,
      furnishing: 'Fully Furnished',
      facing: 'North',
      ageOfPropertyYears: 3,
      carParking: 2,
      floorNumber: 4,
      totalFloors: 5
    },
    amenities: [
      'Keycard Lift Entry',
      'Walk to Cubbon Park & UB City',
      'Bespoke Italian Kitchen',
      'Valet Parking Slot',
      '24/7 Power Backup'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: false,
    status: 'active',
    createdAt: '2025-02-22T16:00:00Z',
    updatedAt: '2025-02-22T16:00:00Z',
    seller: {
      id: 'sel-1',
      name: 'Rohan Kothari',
      type: 'Owner',
      phone: '+91 98450 12890',
      whatsapp: '+919845012890',
      email: 'rohan.kothari@gmail.com'
    }
  },
  {
    id: 'prop-6',
    title: 'The Pavilion Residence — Sarjapur Road',
    tagline: 'Sustainably crafted 4-BHK courtyard villa inside an eco-forest community',
    description: 'Set within an award-winning regenerative community on Sarjapur Road. Constructed with stabilised rammed earth walls, greywater recycling wetlands, solar passive thermal comfort, and private organic kitchen garden.\n\nResidents enjoy community agroforestry, an on-site artisanal bakery, natural swimming lake, and bird sanctuary trails.',
    category: 'villa',
    price: 78000000, // 7.8 Cr
    priceDisplay: '₹7.8 Cr',
    location: {
      address: 'Carmelaram Post, Sarjapur Road',
      locality: 'Sarjapur Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560035'
    },
    features: {
      areaSqFt: 4600,
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      furnishing: 'Semi-Furnished',
      facing: 'East',
      ageOfPropertyYears: 1,
      carParking: 2,
      floorNumber: 0,
      totalFloors: 2
    },
    amenities: [
      'Solar Passive Earth Cooling',
      'Private Organic Garden',
      'Rainwater Harvesting Lake',
      'Community Farm & Forest',
      'Tennis & Badminton Courts',
      '24/7 Security Patrol'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-23T07:30:00Z',
    updatedAt: '2025-02-23T07:30:00Z',
    seller: {
      id: 'sel-6',
      name: 'Vanya Estates & Builders',
      type: 'Builder',
      phone: '+91 98453 55660',
      whatsapp: '+919845355660',
      email: 'sales@vanyaestates.in'
    }
  },
  {
    id: 'prop-7',
    title: 'Heritage Red-Brick Bungalow — Jayanagar 4th Block',
    tagline: 'Distinguished 4-BHK independent house with Mangalore tiled verandahs and private internal garden',
    description: 'An exceptionally preserved independent residence set on a quiet 50x80 site in Jayanagar. Features exposed wire-cut red brick architecture, terrazzo flooring, Burma teak rafters, and a sunlit interior atrium with indigenous flowering plants.\n\nWalking distance to Jayanagar Central Park and South End Circle, offering old-world Bangalore charm with modern structural integrity.',
    category: 'independent-house',
    price: 85000000, // 8.5 Cr
    priceDisplay: '₹8.5 Cr',
    location: {
      address: '9th Main, Jayanagar 4th Block',
      locality: 'Jayanagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560011'
    },
    features: {
      areaSqFt: 4000,
      bedrooms: 4,
      bathrooms: 4,
      balconies: 2,
      furnishing: 'Semi-Furnished',
      facing: 'North',
      ageOfPropertyYears: 8,
      carParking: 2,
      floorNumber: 0,
      totalFloors: 2
    },
    amenities: [
      'Clear A-Khata Title',
      'Private Internal Atrium',
      'Solar Rooftop Grid',
      'Rainwater Well',
      'Mature Mango & Neem Trees'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-22T08:00:00Z',
    updatedAt: '2025-02-22T08:00:00Z',
    seller: {
      id: 'sel-9',
      name: 'Dr. Srinivas Murthy',
      type: 'Owner',
      phone: '+91 94480 55120',
      whatsapp: '+919448055120',
      email: 'srinivas.murthy@gmail.com'
    }
  },
  {
    id: 'prop-8',
    title: 'The Monolith Commercial Floor Plate — ORR Tech Corridor',
    tagline: 'LEED Platinum grade-A commercial workspace with column-free floor plate and acoustic facade',
    description: 'Premier commercial workspace overlooking Outer Ring Road near Bellandur tech corridor. Features 28,000 sq.ft contiguous column-free floor plate, high acoustic attenuation glass facade, 10 high-speed elevators, and EV transit hubs.\n\nIdeal for corporate regional headquarters, venture offices, or specialized design studios looking for premier brand visibility.',
    category: 'commercial',
    price: 320000000, // 32 Cr
    priceDisplay: '₹32.0 Cr',
    location: {
      address: 'ORR Tech Corridor, Near Kadubeesanahalli',
      locality: 'Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103'
    },
    features: {
      areaSqFt: 28000,
      facing: 'North-East',
      ageOfPropertyYears: 0,
      carParking: 40,
      floorNumber: 6,
      totalFloors: 12
    },
    amenities: [
      'LEED Platinum Certified',
      'Column-Free Floor Plate',
      '10 High-Speed Elevators',
      'Dedicated Substation & Backup',
      'Terrace Cafeteria & Lounge'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: false,
    status: 'active',
    createdAt: '2025-02-18T14:00:00Z',
    updatedAt: '2025-02-18T14:00:00Z',
    seller: {
      id: 'sel-4',
      name: 'Prestige Signature Realty',
      type: 'Builder',
      phone: '+91 80 4123 9000',
      whatsapp: '+918041239000',
      email: 'concierge@prestigesignature.com'
    }
  },
  {
    id: 'prop-9',
    title: 'The Canopy Corner Plot — Sarjapur Gated Enclave',
    tagline: 'Corner residential villa plot measuring 4,800 sq.ft facing central park in low-density enclave',
    description: 'Clear BDA-approved residential villa plot with underground cabling, water lines to boundary, landscaped perimeter with mature tabebuia trees, and 100% vaastu compliant orientation.\n\nReady for immediate architectural plan sanction and construction with reputable regional building guidelines.',
    category: 'plot',
    price: 38400000, // 3.84 Cr
    priceDisplay: '₹3.84 Cr',
    location: {
      address: 'Oakridge Enclave, Chikkakannalli, Sarjapur Road',
      locality: 'Sarjapur Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560035'
    },
    features: {
      areaSqFt: 4800,
      facing: 'North-East',
      carParking: 3
    },
    amenities: [
      'BDA Approved Layout',
      'Underground Electrical Cabling',
      'Wide 50ft Paved Boulevard',
      'Clubhouse with Olympic Pool',
      'Gated Entry Security'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: false,
    status: 'active',
    createdAt: '2025-02-23T11:00:00Z',
    updatedAt: '2025-02-23T11:00:00Z',
    seller: {
      id: 'sel-8',
      name: 'Giridhar Natarajan',
      type: 'Owner',
      phone: '+91 98450 77112',
      whatsapp: '+919845077112',
      email: 'giri.natarajan@gmail.com'
    }
  },
  {
    id: 'prop-10',
    title: 'Heritage Coffee Plantation — Chikmagalur Hills',
    tagline: '22 acres of certified organic Arabica coffee, silver oak shade canopy, and planter bungalow',
    description: 'A legacy hill estate situated at 4,100 ft elevation in the Western Ghats. Features an operational coffee processing yard, natural perennial stream, spring water reserves, and a 1920s restored stone bungalow.\n\nSurrounded by natural rainforest reserves with year-round temperate mountain weather and certified high-grade yield.',
    category: 'agricultural',
    price: 88000000, // 8.8 Cr
    priceDisplay: '₹8.8 Cr',
    location: {
      address: 'Mullayanagiri Foothills Road',
      locality: 'Chikmagalur',
      city: 'Chikmagalur',
      state: 'Karnataka',
      pincode: '577101'
    },
    features: {
      areaSqFt: 958320, // 22 Acres
      facing: 'East',
      ageOfPropertyYears: 40,
      carParking: 6
    },
    amenities: [
      'Operational Coffee Pulping Yard',
      'Natural Stream & Springs',
      'Restored Heritage Stone Bungalow',
      'Worker Accommodations',
      'Clear Revenue Land Titles'
    ],
    images: [
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-02-10T12:00:00Z',
    seller: {
      id: 'sel-5',
      name: 'Devraj Urs',
      type: 'Owner',
      phone: '+91 94480 32111',
      whatsapp: '+919448032111',
      email: 'urs.plantations@gmail.com'
    }
  },
  {
    id: 'prop-11',
    title: 'Sky Residence at Koramangala 3rd Block',
    tagline: 'Single-floor 4-BHK luxury apartment with private foyer and panoramic view of St. Johns woods',
    description: 'An exclusive boutique residential floor offering 3,850 sq.ft of curated luxury. Boasts private keycard-accessed elevator, wraparound balconies, Poggenpohl modular kitchen, Italian travertine baths, and separate staff quarters.\n\nOnly one residence per floor ensures unmatched acoustic insulation and 360-degree daylight exposure.',
    category: 'apartment',
    price: 68000000, // 6.8 Cr
    priceDisplay: '₹6.8 Cr',
    location: {
      address: '100ft Road, Koramangala 3rd Block',
      locality: 'Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034'
    },
    features: {
      areaSqFt: 3850,
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      furnishing: 'Fully Furnished',
      facing: 'East',
      ageOfPropertyYears: 2,
      carParking: 2,
      floorNumber: 5,
      totalFloors: 7
    },
    amenities: [
      'Private Keycard Elevator',
      'Poggenpohl Kitchen',
      'Temperature Controlled Pool',
      'Heated Jacuzzi',
      '24/7 Concierge'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: false,
    status: 'active',
    createdAt: '2025-02-23T12:00:00Z',
    updatedAt: '2025-02-23T12:00:00Z',
    seller: {
      id: 'sel-2',
      name: 'Aditi Varma',
      type: 'Agent',
      phone: '+91 99801 44550',
      whatsapp: '+919980144550',
      email: 'aditi.varma@primeproperties.in'
    }
  },
  {
    id: 'prop-12',
    title: 'The Courtyard Manor — Mysuru Royal Vicinity',
    tagline: 'Restored colonial-era 5-BHK independent house on 24,000 sq.ft grounds near Chamundi Hills',
    description: 'A stately independent manor in Jayalakshmipuram, Mysuru. Boasts heritage high-plinth masonry, Italian tiled verandahs, soaring 16-foot ceilings, and century-old rain trees providing cool shade throughout the day.\n\nHand-restored brass fixtures, original Athangudi tiles, and expansive lawns make this an irreplaceable generational property.',
    category: 'independent-house',
    price: 125000000, // 12.5 Cr
    priceDisplay: '₹12.5 Cr',
    location: {
      address: 'Kalidasa Road, Jayalakshmipuram',
      locality: 'Jayalakshmipuram',
      city: 'Mysuru',
      state: 'Karnataka',
      pincode: '570012'
    },
    features: {
      areaSqFt: 5500,
      bedrooms: 5,
      bathrooms: 5,
      balconies: 4,
      furnishing: 'Semi-Furnished',
      facing: 'North',
      ageOfPropertyYears: 25,
      carParking: 5,
      floorNumber: 0,
      totalFloors: 2
    },
    amenities: [
      '24,000 sq.ft Land Parcel',
      'Century-Old Rain Trees',
      'Rosewood Carved Doors',
      'Restored Teak Rafters',
      'Private Water Well'
    ],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: true,
    status: 'active',
    createdAt: '2025-02-20T10:00:00Z',
    updatedAt: '2025-02-21T11:00:00Z',
    seller: {
      id: 'sel-7',
      name: 'Mysore Heritage Realty',
      type: 'Agent',
      phone: '+91 821 241 8900',
      whatsapp: '+918212418900',
      email: 'advisory@mysoreheritage.com'
    }
  },
  {
    id: 'prop-13',
    title: 'High-Street Retail Flagship — 100ft Road Indiranagar',
    tagline: '7,500 sq.ft prime commercial boutique building with 60ft road frontage in Bangalore premier retail hub',
    description: 'An architectural boutique retail building situated on 100 Feet Road, Indiranagar. Features double-height glass display facade, open mezzanine level, dedicated customer valet bay, and high pedestrian footfall.\n\nEquipped with heavy power sanction, grease trap drainage provisions, high-speed capsule lift, and fire compliance certification.',
    category: 'commercial',
    price: 210000000, // 21 Cr
    priceDisplay: '₹21.0 Cr',
    location: {
      address: '100 Feet Road, Near CMH Junction',
      locality: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    features: {
      areaSqFt: 7500,
      facing: 'West',
      ageOfPropertyYears: 1,
      carParking: 12,
      floorNumber: 0,
      totalFloors: 4
    },
    amenities: [
      '60ft Road Frontage',
      'Double Height Glass Facade',
      'Dedicated Passenger Lift',
      '100% Genset Power Backup',
      'Commercial Grade Fire NOC'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: false,
    status: 'active',
    createdAt: '2025-02-21T15:00:00Z',
    updatedAt: '2025-02-21T15:00:00Z',
    seller: {
      id: 'sel-1',
      name: 'Rohan Kothari',
      type: 'Owner',
      phone: '+91 98450 12890',
      whatsapp: '+919845012890',
      email: 'rohan.kothari@gmail.com'
    }
  },
  {
    id: 'prop-14',
    title: 'Organic Pepper & Cardamom Plantation — Coorg Hills',
    tagline: '14 acres of active spice plantation with perennial river boundary and planter cottage',
    description: 'A secluded private plantation located in North Coorg near Madikeri. Nestled amongst rolling evergreen hills with black pepper vines, cardamom valleys, established silver oaks, and a certified spring water bottling permit.\n\nIncludes an authentic stone planter bungalow with wood-burning fireplace, wraparound verandah, and panoramic valley views.',
    category: 'agricultural',
    price: 59000000, // 5.9 Cr
    priceDisplay: '₹5.9 Cr',
    location: {
      address: 'Madikeri–Siddapur Highway',
      locality: 'Madikeri',
      city: 'Coorg',
      state: 'Karnataka',
      pincode: '571201'
    },
    features: {
      areaSqFt: 609840, // 14 Acres
      facing: 'East',
      ageOfPropertyYears: 30,
      carParking: 4
    },
    amenities: [
      'Perennial River Boundary',
      'Spring Water Permit',
      'Restored Stone Planter Cottage',
      'Internal Jeep Trails',
      'Single Owner Clear Title'
    ],
    images: [
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImageIndex: 0,
    isVerified: true,
    isFeatured: false,
    status: 'active',
    createdAt: '2025-02-14T09:30:00Z',
    updatedAt: '2025-02-14T09:30:00Z',
    seller: {
      id: 'sel-5',
      name: 'Devraj Urs',
      type: 'Owner',
      phone: '+91 94480 32111',
      whatsapp: '+919448032111',
      email: 'urs.plantations@gmail.com'
    }
  }
];

export const formatINR = (value: number): string => {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr.toFixed(cr % 1 === 0 ? 0 : 2)} Cr`;
  }
  if (value >= 100000) {
    const lac = value / 100000;
    return `₹${lac.toFixed(lac % 1 === 0 ? 0 : 2)} Lac`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};
