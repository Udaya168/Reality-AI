import React, { useState } from 'react';
import { ListingStepCategory } from './ListingStepCategory';
import { ListingStepDetails } from './ListingStepDetails';
import { ListingStepLocation } from './ListingStepLocation';
import { ListingStepImages } from './ListingStepImages';
import { ListingStepSeller } from './ListingStepSeller';
import { ListingReview } from './ListingReview';
import { useListingForm } from '../hooks/useListingForm';
import { Button } from '../../../components/ui/Button';

export const ListingWizard: React.FC<{
  onComplete?: () => void;
}> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const { formData, updateField } = useListingForm();

  return (
    <div className="bg-white border border-[#E7E6DF] p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3 text-xs font-mono text-[#737970]">
        <span>Step {step} of 6</span>
        <span>Reality AI Staging Wizard</span>
      </div>

      {step === 1 && (
        <ListingStepCategory
          value={formData.propertyType}
          onChange={(val) => updateField('propertyType', val)}
        />
      )}
      {step === 2 && (
        <ListingStepDetails
          title={formData.title}
          setTitle={(v) => updateField('title', v)}
          price={formData.price}
          setPrice={(v) => updateField('price', v)}
          area={formData.area}
          setArea={(v) => updateField('area', v)}
        />
      )}
      {step === 3 && (
        <ListingStepLocation
          city={formData.city}
          setCity={(v) => updateField('city', v)}
          locality={formData.locality}
          setLocality={(v) => updateField('locality', v)}
          address={formData.address}
          setAddress={(v) => updateField('address', v)}
        />
      )}
      {step === 4 && (
        <ListingStepImages
          images={formData.images}
          onChange={(imgs) => updateField('images', imgs)}
        />
      )}
      {step === 5 && (
        <ListingStepSeller
          name={formData.sellerName}
          setName={(v) => updateField('sellerName', v)}
          phone={formData.sellerPhone}
          setPhone={(v) => updateField('sellerPhone', v)}
          type={formData.sellerType}
          setType={(v) => updateField('sellerType', v)}
        />
      )}
      {step === 6 && <ListingReview formData={formData} />}

      <div className="flex items-center justify-between pt-4 border-t border-[#E7E6DF]">
        {step > 1 ? (
          <Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {step < 6 ? (
          <Button variant="primary" size="sm" onClick={() => setStep((s) => s + 1)}>
            Continue
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (onComplete) onComplete();
              alert('Listing staged successfully for moderation review!');
            }}
          >
            Submit Listing
          </Button>
        )}
      </div>
    </div>
  );
};
