import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { PopularLocations } from '../components/PopularLocations';
import { RecentlyListed } from '../components/RecentlyListed';
import { SellCTA } from '../components/SellCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      <HeroSection />
      <FeaturedProperties />
      <PopularLocations />
      <RecentlyListed />
      <SellCTA />
    </div>
  );
};
