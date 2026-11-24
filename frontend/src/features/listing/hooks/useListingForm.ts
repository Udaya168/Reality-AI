import { useState } from 'react';
import { ListingFormData } from '../schemas/listing.schema';

export function useListingForm() {
  const [formData, setFormData] = useState<ListingFormData>({
    propertyType: 'Villa',
    title: '',
    description: '',
    price: '',
    area: '',
    areaUnit: 'sq.ft',
    bedrooms: '4',
    bathrooms: '4',
    facing: 'East',
    propertyAge: '1-5 years',
    amenities: ['24/7 Security', 'Power Backup', 'Water Supply'],
    state: 'Karnataka',
    city: 'Bengaluru',
    locality: '',
    pincode: '',
    address: '',
    images: [],
    sellerName: '',
    sellerPhone: '',
    whatsappNumber: '',
    sellerType: 'Owner',
  });

  const updateField = <K extends keyof ListingFormData>(key: K, value: ListingFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return { formData, updateField, setFormData };
}
