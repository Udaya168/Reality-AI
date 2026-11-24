import React from 'react';
import { calculatePasswordStrength } from '../schemas/auth.schema';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  if (!password) return null;

  const { score, label, color, feedback } = calculatePasswordStrength(password);

  const criteria = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: 'Special symbol', met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-2">
      {/* 4-segment progress bar */}
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: score >= step ? color : '#E2E8F0',
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="font-mono text-[#4A647D]">Password Security</span>
        <span className="font-semibold" style={{ color }}>
          {label}
        </span>
      </div>

      {/* Criteria checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {criteria.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-1.5 text-[10px] ${
              item.met ? 'text-[#183653] font-medium' : 'text-[#4A647D]'
            }`}
          >
            {item.met ? (
              <Check className="w-3 h-3 text-[#183653] shrink-0" />
            ) : (
              <X className="w-3 h-3 text-[#94A3B8] shrink-0" />
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
