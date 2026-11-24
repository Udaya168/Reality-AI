/**
 * Lightweight client-side input validations
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidIndianPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, '');
  return clean.length === 10 || (clean.length === 12 && clean.startsWith('91'));
}

export function isValidPincode(pincode: string): boolean {
  return /^\d{6}$/.test(pincode.trim());
}
