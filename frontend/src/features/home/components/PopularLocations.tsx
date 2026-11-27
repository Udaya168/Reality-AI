import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { featuredLocations } from '../../../data/constants/locations';
import { useAuth } from '../../../context/AuthContext';

export const PopularLocations: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLocationClick = (locName: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login?redirect=properties');
      return;
    }
    navigate(`/properties?location=${encodeURIComponent(locName.split(' ')[0])}`);
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-[#D9E0E6] gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#354B60] block">
            Geographic Curation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#183653] font-normal mt-1 tracking-tight">
            Discover by Enclave
          </h2>
        </div>
        <Link
          to={isAuthenticated ? "/properties" : "/login?redirect=properties"}
          className="text-xs font-mono uppercase tracking-wider text-[#183653] hover:text-[#315D82] flex items-center gap-1.5 transition-colors group shrink-0"
        >
          <span>All Karnataka Enclaves</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {featuredLocations.map((loc) => (
          <div
            key={loc.id}
            onClick={(e) => handleLocationClick(loc.name, e)}
            className="group relative h-80 rounded-3xl overflow-hidden border border-[#D9E0E6]/80 bg-white flex flex-col justify-end p-6 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <img
              src={loc.image}
              alt={loc.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white">
                <MapPin className="w-3 h-3 text-[#7896B2]" />
                <span>{loc.city}</span>
              </span>
              <h3 className="font-serif text-xl font-medium text-white group-hover:underline underline-offset-4">
                {loc.name}
              </h3>
              <p className="text-[11px] text-white/80 line-clamp-1 font-light">
                {loc.tagline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
