import { mockProperties } from '../../../data/mock/mockProperties';
import { Property, PropertyCategory } from '../types/property.types';

export const propertyService = {
  getAll(): Promise<Property[]> {
    return Promise.resolve(mockProperties);
  },
  getById(id: string): Promise<Property | undefined> {
    return Promise.resolve(mockProperties.find((p) => p.id === id));
  },
  getByCategory(category: PropertyCategory | string): Promise<Property[]> {
    if (category === 'all') return Promise.resolve(mockProperties);
    return Promise.resolve(mockProperties.filter((p) => p.category === category));
  },
};
