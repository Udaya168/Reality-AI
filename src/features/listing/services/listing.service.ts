import { ListingFormData } from '../schemas/listing.schema';

export const listingService = {
  submitListing(data: ListingFormData): Promise<{ id: string; success: boolean }> {
    const id = `LIST-${Math.floor(100000 + Math.random() * 900000)}`;
    return Promise.resolve({ id, success: true });
  },
};
