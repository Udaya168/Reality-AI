import { PasswordStrengthResult } from '../types/auth.types';

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
};

export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  const cleaned = phone.replace(/\D/g, '');
  if (!cleaned) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  if (cleaned.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits.' };
  }
  return { isValid: true };
};

export const calculatePasswordStrength = (password: string): PasswordStrengthResult => {
  if (!password) {
    return {
      score: 0,
      label: 'Very Weak',
      color: '#E05252',
      feedback: ['Enter a password'],
    };
  }

  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('At least 8 characters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One uppercase letter');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One number');
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One special symbol');
  }

  const labels: Array<PasswordStrengthResult['label']> = [
    'Very Weak',
    'Weak',
    'Fair',
    'Strong',
    'Very Strong',
  ];

  const colors = [
    '#E05252', // Very Weak - Red
    '#E08252', // Weak - Orange
    '#E0C252', // Fair - Amber
    '#2E7D32', // Strong - Green
    '#1B5E20', // Very Strong - Deep Green
  ];

  return {
    score,
    label: labels[score],
    color: colors[score],
    feedback,
  };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must include at least one letter and one number.' };
  }
  return { isValid: true };
};
