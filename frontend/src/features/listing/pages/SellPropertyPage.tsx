import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2, Home, TreePine, Landmark, Layers, Warehouse,
  Factory, Check, ArrowRight, ArrowLeft, Upload, Trash2,
  Star, Image as ImageIcon, Sparkles, MapPin, Phone,
  MessageSquare, UserCheck, ShieldCheck, AlertCircle, Eye,
  Maximize2, BedDouble, Bath, Compass, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Badge, Button, Card } from '../../../components/ui';
import { formatINR } from '../../../data/mockProperties';
import { useAuth } from '../../../context/AuthContext';

export type WizardPropertyType =
  | 'Residential'
  | 'Villa'
  | 'Apartment'
  | 'Plot/Land'
  | 'Commercial'
  | 'Agricultural'
  | 'Industrial';

export type WizardSellerType = 'Owner' | 'Agent' | 'Builder';

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  isCover: boolean;
}

export const SellPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Step 1: Property Type
  const [propertyType, setPropertyType] = useState<WizardPropertyType>('Villa');

  // Step 2: Details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [areaUnit, setAreaUnit] = useState<string>('sq.ft');
  const [bedrooms, setBedrooms] = useState<string>('4');
  const [bathrooms, setBathrooms] = useState<string>('4');
  const [facing, setFacing] = useState<string>('East');
  const [propertyAge, setPropertyAge] = useState<string>('1-5 years');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    '24/7 Security',
    'Power Backup',
    'Water Supply'
  ]);

  // Step 3: Location
  const [state, setState] = useState('Karnataka');
  const [city, setCity] = useState('Bengaluru');
  const [locality, setLocality] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  // Step 4: Photos
  const [images, setImages] = useState<UploadedImage[]>([
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      name: 'Architectural Exterior Facade',
      isCover: true,
    },
    {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      name: 'Central Rain Courtyard & Living Area',
      isCover: false,
    },
    {
      id: 'img-3',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      name: 'Dining & Kitchen Pavilion',
      isCover: false,
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);

  // Step 5: Seller Information
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [sellerType, setSellerType] = useState<WizardSellerType>('Owner');

  // Pre-fill authenticated seller details
  useEffect(() => {
    if (user) {
      if (user.name && !sellerName) {
        setSellerName(user.name);
      }
      if (user.phone && !sellerPhone) {
        setSellerPhone(user.phone);
        if (sameAsPhone) {
          setWhatsappNumber(user.phone);
        }
      }
      if (user.role === 'Agent' || user.role === 'Builder' || user.role === 'Owner') {
        setSellerType(user.role);
      }
    }
  }, [user]);

  // Step 6 / Completion state
  const [isPublished, setIsPublished] = useState(false);
  const [generatedListingId, setGeneratedListingId] = useState('');

  // Wizard Steps metadata
  const steps = [
    { number: 1, title: 'Property Type', description: 'Category typology' },
    { number: 2, title: 'Details', description: 'Pricing & specs' },
    { number: 3, title: 'Location', description: 'Address & city' },
    { number: 4, title: 'Photos', description: 'Gallery & cover' },
    { number: 5, title: 'Seller Info', description: 'Contact details' },
    { number: 6, title: 'Review', description: 'Publish listing' },
  ];

  // Property types list
  const propertyTypeOptions = [
    {
      type: 'Villa' as WizardPropertyType,
      title: 'Villa & Estate',
      description: 'Independent luxury homes, private courtyard villas, and gated residences',
      icon: Home,
    },
    {
      type: 'Apartment' as WizardPropertyType,
      title: 'Apartment & Penthouse',
      description: 'High-rise sky residences, duplex lofts, and garden condominiums',
      icon: Building2,
    },
    {
      type: 'Residential' as WizardPropertyType,
      title: 'Residential House',
      description: 'Independent houses, row houses, and traditional bungalows',
      icon: Layers,
    },
    {
      type: 'Plot/Land' as WizardPropertyType,
      title: 'Plot & Land',
      description: 'Residential layouts, corner plots, and custom villa parcels',
      icon: TreePine,
    },
    {
      type: 'Commercial' as WizardPropertyType,
      title: 'Commercial Property',
      description: 'Office floor plates, boutique retail spaces, and corporate buildings',
      icon: Landmark,
    },
    {
      type: 'Agricultural' as WizardPropertyType,
      title: 'Agricultural Land',
      description: 'Coffee plantations, farmland, organic groves, and orchard estates',
      icon: TreePine,
    },
    {
      type: 'Industrial' as WizardPropertyType,
      title: 'Industrial Space',
      description: 'Warehouses, manufacturing bays, and logistics facilities',
      icon: Factory,
    },
  ];

  // Common amenities catalog
  const amenitiesCatalog = [
    'Private Swimming Pool',
    'Double Height Ceiling',
    'Landscaped Garden',
    'Home Automation',
    '24/7 Gated Security',
    '100% Power Backup',
    'EV Charging Point',
    'Solar Water Heating',
    'Rainwater Harvesting',
    'High Yield Borewell',
    'Staff Quarters',
    'Covered Car Parking',
    'Clubhouse Access',
    'Gym & Wellness Suite',
  ];

  // Conditional field helpers
  const isResidentialType = ['Residential', 'Villa', 'Apartment'].includes(propertyType);
  const isLandOrAgri = ['Plot/Land', 'Agricultural'].includes(propertyType);

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Image upload handler (Drag & drop or file input)
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newUploaded: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newImg: UploadedImage = {
            id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            url: e.target.result as string,
            name: file.name,
            isCover: images.length === 0 && newUploaded.length === 0,
          };
          setImages((prev) => [...prev, newImg]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Set cover image
  const setCoverImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isCover: img.id === id,
      }))
    );
  };

  // Remove image
  const removeImage = (id: string) => {
    setImages((prev) => {
      const remaining = prev.filter((img) => img.id !== id);
      // If we removed the cover, set the first one as cover
      if (remaining.length > 0 && !remaining.some((img) => img.isCover)) {
        remaining[0].isCover = true;
      }
      return remaining;
    });
  };

  // Step Validation logic
  const validateStep = (stepNumber: number): boolean => {
    setValidationError(null);

    if (stepNumber === 1) {
      if (!propertyType) {
        setValidationError('Please select a property category to continue.');
        return false;
      }
    }

    if (stepNumber === 2) {
      if (!title.trim()) {
        setValidationError('Please enter a descriptive property title.');
        return false;
      }
      if (!price || parseFloat(price) <= 0) {
        setValidationError('Please enter a valid asking price in INR.');
        return false;
      }
      if (!area || parseFloat(area) <= 0) {
        setValidationError('Please enter the property area.');
        return false;
      }
    }

    if (stepNumber === 3) {
      if (!city.trim()) {
        setValidationError('Please provide the property city.');
        return false;
      }
      if (!locality.trim()) {
        setValidationError('Please enter the neighborhood or locality.');
        return false;
      }
      if (!pincode.trim() || pincode.trim().length < 6) {
        setValidationError('Please enter a valid 6-digit postal pincode.');
        return false;
      }
      if (!address.trim()) {
        setValidationError('Please provide the street address or plot location.');
        return false;
      }
    }

    if (stepNumber === 4) {
      if (images.length === 0) {
        setValidationError('Please upload at least one photograph of the property.');
        return false;
      }
    }

    if (stepNumber === 5) {
      if (!sellerName.trim()) {
        setValidationError('Please enter your full name.');
        return false;
      }
      if (!sellerPhone.trim() || sellerPhone.trim().length < 10) {
        setValidationError('Please provide a valid 10-digit telephone number.');
        return false;
      }
    }

    return true;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setValidationError(null);
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Final Publish Handler
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) {
      setCurrentStep(5);
      return;
    }

    const randomId = `LIST-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedListingId(randomId);
    setIsPublished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cover image helper
  const coverImage = images.find((i) => i.isCover)?.url || images[0]?.url;

  // -------------------------------------------------------------
  // SUCCESS SCREEN WHEN LISTING IS PUBLISHED
  // -------------------------------------------------------------
  if (isPublished) {
    return (
      <div className="py-16 sm:py-24">
        <Container size="narrow">
          <Card padding="lg" className="text-center space-y-6 border border-[#183653]">
            <div className="w-16 h-16 bg-[#183653] text-white mx-auto flex items-center justify-center rounded-3xl shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#315D82] bg-[#DCE7F0] px-3 py-1 rounded-2xl">
                Staged for Review &bull; Reference #{generatedListingId}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#183653] font-normal tracking-tight">
                Listing Staged Successfully
              </h1>
              <p className="text-sm text-[#354B60] max-w-lg mx-auto leading-relaxed font-light">
                Your listing <strong className="text-[#102B46]">"{title}"</strong> has been submitted successfully. Our architectural appraisal desk will review ownership titles and photographs before publishing to verified patrons.
              </p>
            </div>

            {/* Property Summary Card */}
            <div className="p-6 bg-[#F8F7F3] border border-[#D9E0E6] text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[#354B60] block">TYPOLOGY</span>
                <span className="text-[#102B46] font-bold text-sm font-sans">{propertyType}</span>
              </div>
              <div>
                <span className="text-[#354B60] block">ASKING PRICE</span>
                <span className="text-[#183653] font-bold text-sm font-sans">
                  {price ? formatINR(parseFloat(price)) : '—'}
                </span>
              </div>
              <div>
                <span className="text-[#354B60] block">LOCATION</span>
                <span className="text-[#102B46] font-sans">{locality}, {city}</span>
              </div>
              <div>
                <span className="text-[#354B60] block">SELLER CONTACT</span>
                <span className="text-[#102B46] font-sans">{sellerName} ({sellerType})</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/properties"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#183653] text-white text-xs font-mono uppercase tracking-wider rounded-2xl hover:bg-[#315D82] transition-colors"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => {
                  setIsPublished(false);
                  setCurrentStep(1);
                  setTitle('');
                  setPrice('');
                  setArea('');
                  setLocality('');
                  setAddress('');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 border border-[#D9E0E6] bg-white text-[#102B46] text-xs font-mono uppercase tracking-wider rounded-2xl hover:border-[#183653] transition-colors"
              >
                <span>List Another Property</span>
              </button>
            </div>

            <p className="text-[11px] text-[#354B60] font-mono uppercase tracking-wider pt-2">
              Note: Backend database integration will be introduced in a future phase.
            </p>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 pb-24">
      <Container size="default">
        {/* ========================================================= */}
        {/* WIZARD HEADER                                             */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <Badge variant="subtle" size="sm">
            Seller Concierge &bull; Karnataka
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#183653] font-normal tracking-tight">
            List Your Property
          </h1>
          <p className="text-xs sm:text-sm text-[#354B60] font-light leading-relaxed">
            Reach verified buyers and high-net-worth individuals across Karnataka with zero brokerage and direct inquiries.
          </p>
        </div>

        {/* ========================================================= */}
        {/* PROGRESS INDICATOR STRIP                                  */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-6 gap-2 sm:gap-4 border-b border-[#D9E0E6] pb-4">
            {steps.map((s) => {
              const isPassed = currentStep > s.number;
              const isCurrent = currentStep === s.number;

              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => {
                    // Allow navigating back to completed steps
                    if (s.number < currentStep) setCurrentStep(s.number);
                  }}
                  className={`flex flex-col items-center text-center group cursor-pointer transition-colors ${isPassed ? 'text-[#315D82]' : isCurrent ? 'text-[#183653]' : 'text-[#7896B2]'
                    }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono text-xs mb-1.5 transition-all rounded-2xl ${isCurrent
                        ? 'bg-[#183653] text-white font-bold ring-2 ring-[#183653]/20'
                        : isPassed
                          ? 'bg-[#315D82] text-white'
                          : 'bg-white border border-[#D9E0E6] text-[#354B60]'
                      }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : s.number}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider line-clamp-1">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* FORM CONTAINER & STEP ROUTING                             */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto">
          {/* Validation Alert */}
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 rounded-2xl"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{validationError}</span>
            </motion.div>
          )}

          <Card padding="lg" className="border border-[#D9E0E6] shadow-sm">
            <AnimatePresence mode="wait">
              {/* ===================================================== */}
              {/* STEP 1: SELECT PROPERTY TYPE                          */}
              {/* ===================================================== */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#D9E0E6] pb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                      Step 1 of 6
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#183653] font-normal">
                      Select Property Typology
                    </h2>
                    <p className="text-xs text-[#354B60] mt-1 font-light">
                      Choose the category that best describes your property listing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {propertyTypeOptions.map((opt) => {
                      const IconComponent = opt.icon;
                      const isSelected = propertyType === opt.type;

                      return (
                        <button
                          key={opt.type}
                          type="button"
                          onClick={() => {
                            setPropertyType(opt.type);
                            setValidationError(null);
                          }}
                          className={`p-4 border text-left transition-all rounded-2xl cursor-pointer flex flex-col justify-between ${isSelected
                              ? 'border-[#183653] bg-[#183653]/5 shadow-sm'
                              : 'border-[#D9E0E6] bg-white hover:border-[#183653]'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif text-lg font-semibold text-[#102B46]">
                              {opt.title}
                            </span>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#183653] text-white' : 'bg-[#EDF2F6] text-[#354B60]'
                                }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                          </div>
                          <p className="text-xs text-[#354B60] font-light leading-relaxed">
                            {opt.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ===================================================== */}
              {/* STEP 2: PROPERTY DETAILS                              */}
              {/* ===================================================== */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#D9E0E6] pb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                      Step 2 of 6 &bull; {propertyType}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#183653] font-normal">
                      Property Details &amp; Specifications
                    </h2>
                    <p className="text-xs text-[#354B60] mt-1 font-light">
                      Provide accurate measurements, asking price, and standout architectural features.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Title */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                        Listing Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Modern Minimalist Courtyard Villa in Sadashivanagar"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                      />
                    </div>

                    {/* Price and Area in Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Asking Price */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          Asking Price (INR) *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          placeholder="e.g. 185000000"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                        />
                        {price && !isNaN(parseFloat(price)) && (
                          <div className="text-[11px] font-mono text-[#183653] font-semibold mt-1">
                            Formatted: {formatINR(parseFloat(price))}
                          </div>
                        )}
                      </div>

                      {/* Area & Unit */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          Property Area *
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            required
                            min="1"
                            placeholder="e.g. 5200"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-2/3 p-3 text-sm border border-r-0 border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-l-[1px] bg-white placeholder:text-[#7896B2]"
                          />
                          <select
                            value={areaUnit}
                            onChange={(e) => setAreaUnit(e.target.value)}
                            className="w-1/3 p-3 text-xs font-mono uppercase border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-r-[1px] bg-[#F8F7F3] cursor-pointer"
                          >
                            <option value="sq.ft">sq.ft</option>
                            <option value="sq.yards">sq.yards</option>
                            <option value="acres">Acres</option>
                            <option value="gunthas">Gunthas</option>
                            <option value="cents">Cents</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Conditional Bedrooms & Bathrooms (Only for residential/villa/apartment) */}
                    {isResidentialType && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                            Bedrooms (BHK)
                          </label>
                          <select
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white cursor-pointer"
                          >
                            <option value="1">1 BHK</option>
                            <option value="2">2 BHK</option>
                            <option value="3">3 BHK</option>
                            <option value="4">4 BHK</option>
                            <option value="5">5+ BHK</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                            Bathrooms
                          </label>
                          <select
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                            className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white cursor-pointer"
                          >
                            <option value="1">1 Bath</option>
                            <option value="2">2 Baths</option>
                            <option value="3">3 Baths</option>
                            <option value="4">4 Baths</option>
                            <option value="5">5+ Baths</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Facing & Property Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          Cardinal Orientation / Facing
                        </label>
                        <select
                          value={facing}
                          onChange={(e) => setFacing(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white cursor-pointer"
                        >
                          <option value="East">East</option>
                          <option value="North">North</option>
                          <option value="North-East">North-East</option>
                          <option value="West">West</option>
                          <option value="South">South</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          Property Age
                        </label>
                        <select
                          value={propertyAge}
                          onChange={(e) => setPropertyAge(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white cursor-pointer"
                        >
                          <option value="Under Construction">Under Construction / New</option>
                          <option value="0-1 years">Less than 1 Year</option>
                          <option value="1-5 years">1 to 5 Years</option>
                          <option value="5-10 years">5 to 10 Years</option>
                          <option value="10+ years">10+ Years</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                        Architectural Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Detail the spatial flow, thermal orientation, natural ventilation, material finishes (e.g. teak, exposed concrete), and community amenities..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white leading-relaxed placeholder:text-[#7896B2]"
                      />
                    </div>

                    {/* Amenities Selection Pills */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-2">
                        Features &amp; Amenities
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {amenitiesCatalog.map((amenity) => {
                          const isSelected = selectedAmenities.includes(amenity);
                          return (
                            <button
                              key={amenity}
                              type="button"
                              onClick={() => toggleAmenity(amenity)}
                              className={`text-xs px-3 py-1.5 rounded-2xl border transition-colors cursor-pointer flex items-center gap-1.5 ${isSelected
                                  ? 'bg-[#183653] text-white border-[#183653]'
                                  : 'bg-white text-[#102B46] border-[#D9E0E6] hover:border-[#183653]'
                                }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-[#7896B2]" />}
                              <span>{amenity}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===================================================== */}
              {/* STEP 3: LOCATION                                      */}
              {/* ===================================================== */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#D9E0E6] pb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                      Step 3 of 6
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#183653] font-normal">
                      Property Location
                    </h2>
                    <p className="text-xs text-[#354B60] mt-1 font-light">
                      Buyers discover homes based on regional geography, canopy roads, and proximity.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* State & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          State *
                        </label>
                        <select
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white cursor-pointer"
                        >
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Goa">Goa</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bengaluru, Mysuru, Chikmagalur"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                        />
                      </div>
                    </div>

                    {/* Locality & Pincode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          Neighborhood / Locality *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sadashivanagar, Whitefield, Sarjapur"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="e.g. 560080"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                        />
                      </div>
                    </div>

                    {/* Full Address */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                        Street Address or Plot No. *
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="e.g. Plot 42, 5th Cross Road, Sadashivanagar"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white leading-relaxed placeholder:text-[#7896B2]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===================================================== */}
              {/* STEP 4: PHOTOGRAPHY & MEDIA                           */}
              {/* ===================================================== */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#D9E0E6] pb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                      Step 4 of 6
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#183653] font-normal">
                      High-Resolution Photography
                    </h2>
                    <p className="text-xs text-[#354B60] mt-1 font-light">
                      Upload clear, natural daylight photographs. Drag to reorder, and select a cover image.
                    </p>
                  </div>

                  {/* Drag & Drop Upload Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFileUpload(e.dataTransfer.files);
                    }}
                    className={`border-2 border-dashed p-8 text-center transition-all rounded-2xl ${isDragging
                        ? 'border-[#183653] bg-[#183653]/10'
                        : 'border-[#D9E0E6] bg-[#F8F7F3] hover:border-[#183653]'
                      }`}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                      <div className="w-12 h-12 bg-white text-[#183653] mx-auto flex items-center justify-center rounded-2xl border border-[#D9E0E6] shadow-xs">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-sm font-semibold text-[#102B46]">
                        Click to upload or drag &amp; drop photos
                      </div>
                      <p className="text-xs text-[#354B60] font-light max-w-sm mx-auto">
                        Supports JPEG, PNG, WebP up to 15MB each. High resolution landscape orientations recommended.
                      </p>
                    </label>
                  </div>

                  {/* Thumbnail Gallery & Cover Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#354B60]">
                      <span>{images.length} Photographs Staged</span>
                      <span className="text-[#183653]">Click star to designate cover</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((img) => (
                        <div
                          key={img.id}
                          className={`relative aspect-[4/3] border-2 overflow-hidden bg-white group rounded-2xl ${img.isCover ? 'border-[#183653]' : 'border-[#D9E0E6]'
                            }`}
                        >
                          <img src={img.url} alt={img.name} className="w-full h-full object-cover" />

                          {/* Cover badge */}
                          {img.isCover && (
                            <span className="absolute top-2 left-2 bg-[#183653] text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded-2xl shadow-sm">
                              Cover Photo
                            </span>
                          )}

                          {/* Hover Overlay Controls */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => setCoverImage(img.id)}
                              className={`p-2 rounded-2xl cursor-pointer ${img.isCover ? 'bg-[#183653] text-white' : 'bg-white text-[#102B46] hover:bg-[#183653] hover:text-white'
                                }`}
                              title={img.isCover ? 'Current Cover Photo' : 'Set as Cover Photo'}
                            >
                              <Star className={`w-4 h-4 ${img.isCover ? 'fill-current' : ''}`} />
                            </button>

                            <button
                              type="button"
                              onClick={() => removeImage(img.id)}
                              className="p-2 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-colors cursor-pointer"
                              title="Delete photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===================================================== */}
              {/* STEP 5: SELLER INFORMATION                            */}
              {/* ===================================================== */}
              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#D9E0E6] pb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                      Step 5 of 6
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#183653] font-normal">
                      Seller Representation
                    </h2>
                    <p className="text-xs text-[#354B60] mt-1 font-light">
                      Buyers contact you directly via phone, WhatsApp, and enquiry dispatch.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Rao"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          Primary Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98450 12890"
                          value={sellerPhone}
                          onChange={(e) => setSellerPhone(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                          WhatsApp Contact Number
                        </label>
                        <input
                          type="tel"
                          disabled={sameAsPhone}
                          placeholder="+91 98450 12890"
                          value={sameAsPhone ? sellerPhone : whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          className="w-full p-3 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2] disabled:bg-[#EDF2F6] disabled:opacity-70"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-xs text-[#102B46] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsPhone}
                        onChange={(e) => setSameAsPhone(e.target.checked)}
                        className="accent-[#183653] cursor-pointer"
                      />
                      <span>WhatsApp number is the same as primary phone</span>
                    </label>

                    {/* Seller Type Selector */}
                    <div className="pt-2">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-2">
                        I am listing as *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['Owner', 'Agent', 'Builder'] as WizardSellerType[]).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSellerType(type)}
                            className={`p-3 text-center border text-xs font-mono uppercase tracking-wider rounded-2xl transition-colors cursor-pointer ${sellerType === type
                                ? 'bg-[#183653] text-white border-[#183653] font-bold'
                                : 'bg-white text-[#102B46] border-[#D9E0E6] hover:border-[#183653]'
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===================================================== */}
              {/* STEP 6: REVIEW & PUBLISH                              */}
              {/* ===================================================== */}
              {currentStep === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#D9E0E6] pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                        Step 6 of 6 &bull; Final Verification
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-[#183653] font-normal">
                        Review Your Listing
                      </h2>
                    </div>
                    <Badge variant="subtle" size="sm">
                      Ready to Publish
                    </Badge>
                  </div>

                  {/* Listing Preview Container */}
                  <div className="bg-[#F8F7F3] border border-[#D9E0E6] p-6 space-y-6 rounded-2xl">
                    {/* Header preview */}
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div className="relative w-full sm:w-44 aspect-[4/3] bg-black/5 overflow-hidden shrink-0 border border-[#D9E0E6]">
                        <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-mono uppercase px-1.5 py-0.5">
                          {images.length} Photos
                        </span>
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" size="sm">{propertyType}</Badge>
                          <span className="text-[10px] font-mono text-[#354B60] uppercase">
                            {locality}, {city}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#183653] font-normal">
                          {title || 'Untitled Property Listing'}
                        </h3>
                        <div className="font-serif text-2xl font-bold text-[#183653]">
                          {price ? formatINR(parseFloat(price)) : 'Price on Request'}
                        </div>
                      </div>
                    </div>

                    {/* Specs Summary Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#D9E0E6] text-xs">
                      <div>
                        <span className="font-mono uppercase text-[#354B60] block text-[10px]">Area</span>
                        <span className="font-semibold text-[#102B46]">{area || '—'} {areaUnit}</span>
                      </div>
                      {isResidentialType && (
                        <div>
                          <span className="font-mono uppercase text-[#354B60] block text-[10px]">Bedrooms</span>
                          <span className="font-semibold text-[#102B46]">{bedrooms} BHK</span>
                        </div>
                      )}
                      <div>
                        <span className="font-mono uppercase text-[#354B60] block text-[10px]">Orientation</span>
                        <span className="font-semibold text-[#102B46]">{facing}</span>
                      </div>
                      <div>
                        <span className="font-mono uppercase text-[#354B60] block text-[10px]">Age</span>
                        <span className="font-semibold text-[#102B46]">{propertyAge}</span>
                      </div>
                    </div>

                    {/* Address & Seller */}
                    <div className="pt-4 border-t border-[#D9E0E6] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                      <div>
                        <span className="font-mono uppercase text-[#354B60] block text-[10px]">LOCATION</span>
                        <span className="text-[#102B46]">{address}, {locality}, {city} — {pincode}</span>
                      </div>
                      <div>
                        <span className="font-mono uppercase text-[#354B60] block text-[10px]">SELLER CONTACT</span>
                        <span className="text-[#102B46]">{sellerName} ({sellerType}) &bull; {sellerPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-[#D9E0E6] text-xs text-[#354B60] leading-relaxed flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#315D82] shrink-0" />
                    <span>
                      By submitting, you affirm that all property details are authentic and you hold authority to market this asset.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ======================================================= */}
            {/* WIZARD BOTTOM CONTROLS (Back / Continue / Publish)       */}
            {/* ======================================================= */}
            <div className="flex items-center justify-between pt-8 border-t border-[#D9E0E6] mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#D9E0E6] text-xs font-mono uppercase tracking-wider text-[#102B46] hover:border-[#183653] rounded-2xl transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#183653] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#315D82] rounded-2xl transition-colors cursor-pointer active:scale-[0.99]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#183653] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#315D82] rounded-2xl transition-colors shadow-sm cursor-pointer active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Listing</span>
                </button>
              )}
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};
