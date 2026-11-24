import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, Lock, Mail, Phone, User, ArrowRight,
  CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Building2, Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Button } from '../../../components/ui';
import { useAuth, getRedirectPathForRole } from '../../../context/AuthContext';
import { UserAccountType } from '../types/auth.types';
import { validateEmail, validatePhone, validatePassword } from '../schemas/auth.schema';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';
import { GoogleSignInButton } from '../components/GoogleSignInButton';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, isConfigured } = useAuth();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<UserAccountType>('buyer');
  const [agencyName, setAgencyName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignUp = async () => {
    setErrorMessage(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle({
        accountType,
        redirectTo: `${window.location.origin}/login`,
      });
    } catch (err: unknown) {
      setIsGoogleLoading(false);
      const message =
        err instanceof Error
          ? err.message
          : 'Google sign-up could not be initiated. Please verify provider configuration.';
      setErrorMessage(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Name validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }

    // 2. Email validation
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    // 3. Phone validation
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.isValid) {
      setErrorMessage(phoneCheck.error || 'Please enter a valid 10-digit telephone number.');
      return;
    }

    // 4. Password validation
    const passCheck = validatePassword(password);
    if (!passCheck.isValid) {
      setErrorMessage(passCheck.error || 'Password must be at least 8 characters long.');
      return;
    }

    // 5. Confirm password
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    // 6. Terms check
    if (!agreeTerms) {
      setErrorMessage('Please acknowledge the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp({
        email,
        password,
        fullName,
        phone,
        accountType,
        agencyName: accountType === 'seller' ? agencyName : undefined,
      });

      if (result.needsEmailVerification) {
        // Redirect to email verification waiting page
        navigate(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        // Direct session established (e.g., auto-confirm enabled in Supabase)
        const destination = getRedirectPathForRole(accountType);
        navigate(destination, { replace: true });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      if (message.toLowerCase().includes('already registered')) {
        setErrorMessage('An account with this email already exists. Please sign in instead.');
      } else {
        setErrorMessage(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 border border-[#D9E0E6] bg-white shadow-[0_8px_32px_rgba(24,54,83,0.08)] overflow-hidden rounded-3xl">
          
          {/* Left Architectural Brand Banner (Span 5 on Desktop) */}
          <div className="hidden md:flex md:col-span-5 bg-[#183653] text-[#F8F7F3] p-8 lg:p-10 flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="w-8 h-8 rounded-2xl bg-white text-[#183653] flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                  R
                </span>
                <span className="font-serif text-xl tracking-tight font-semibold text-white">
                  REALITY
                </span>
              </Link>
              <div className="pt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7896B2] block mb-1">
                  Join the Network
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl text-white font-medium leading-tight">
                  List and discover architectural masterpieces.
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-3 leading-relaxed">
                  Join Karnataka’s curated architectural estate registry. Register as a discerning buyer or an estate owner/developer.
                </p>
              </div>
            </div>

            {/* Account benefits */}
            <div className="space-y-3 relative z-10 pt-8 border-t border-white/10 text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Private Architectural Dossiers & Tours</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Verified Direct Seller Inquiries</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Supabase Secure Credential Vault</span>
              </div>
            </div>

            {/* Specular Ambient Glow */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#354B60]/40 blur-3xl pointer-events-none" />
          </div>

          {/* Right Form Container (Span 7 on Desktop) */}
          <div className="col-span-1 md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              
              {/* Header */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A647D] block mb-1">
                  Create Your Account
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183653] tracking-tight">
                  Join Reality AI
                </h1>
                <p className="text-xs text-[#4A647D] mt-1">
                  Complete the verification details below to activate your account.
                </p>
              </div>

              {/* Unconfigured Notice */}
              {!isConfigured && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                  <div>
                    <span className="font-semibold block">Supabase Connection Notice</span>
                    <span>
                      Please add your Supabase credentials to <code className="bg-amber-100 px-1 rounded">frontend/.env</code> to register live accounts.
                    </span>
                  </div>
                </div>
              )}

              {/* Error Notice */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Account Type Selector (Buyer vs Seller) */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-2">
                    Account Category *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccountType('buyer')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        accountType === 'buyer'
                          ? 'border-[#183653] bg-[#183653]/5 ring-1 ring-[#183653]'
                          : 'border-[#D9E0E6] bg-[#FAF9F6] hover:border-[#7896B2]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-[#183653]" />
                        <span className="font-serif text-sm font-semibold text-[#183653]">Buyer</span>
                      </div>
                      <span className="text-[10px] text-[#4A647D] block leading-tight">
                        Explore and save architectural residences
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('seller')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        accountType === 'seller'
                          ? 'border-[#183653] bg-[#183653]/5 ring-1 ring-[#183653]'
                          : 'border-[#D9E0E6] bg-[#FAF9F6] hover:border-[#7896B2]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-[#183653]" />
                        <span className="font-serif text-sm font-semibold text-[#183653]">Seller / Owner</span>
                      </div>
                      <span className="text-[10px] text-[#4A647D] block leading-tight">
                        List estates and receive verified inquiries
                      </span>
                    </button>
                  </div>
                </div>

                {/* Google Sign-Up Provider */}
                <div className="space-y-4 pt-1">
                  <GoogleSignInButton
                    onSignIn={handleGoogleSignUp}
                    isLoading={isGoogleLoading}
                    disabled={isLoading || isGoogleLoading || !isConfigured}
                    text={
                      accountType === 'seller'
                        ? 'Continue with Google as Seller'
                        : 'Continue with Google as Buyer'
                    }
                  />

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-[#D9E0E6] w-full" />
                    <span className="bg-white px-3 text-[10px] font-mono uppercase tracking-widest text-[#7896B2] shrink-0">
                      Or register with credentials
                    </span>
                    <div className="border-t border-[#D9E0E6] w-full" />
                  </div>
                </div>

                {/* Full Legal Name */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maya Rao"
                      disabled={isLoading}
                      className="w-full pl-10 pr-3.5 py-3 border border-[#D9E0E6] rounded-2xl text-xs text-[#102B46] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 transition-all bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                {/* If Seller, optional Agency / Developer name */}
                {accountType === 'seller' && (
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                      Agency / Firm Name (Optional)
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        placeholder="e.g. Prestige Architecture Group"
                        disabled={isLoading}
                        className="w-full pl-10 pr-3.5 py-3 border border-[#D9E0E6] rounded-2xl text-xs text-[#102B46] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 transition-all bg-[#FAF9F6]"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@realityai.estate"
                      disabled={isLoading}
                      className="w-full pl-10 pr-3.5 py-3 border border-[#D9E0E6] rounded-2xl text-xs text-[#102B46] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 transition-all bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    Telephone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98450 12345"
                      disabled={isLoading}
                      className="w-full pl-10 pr-3.5 py-3 border border-[#D9E0E6] rounded-2xl text-xs text-[#102B46] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 transition-all bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                {/* Password with Strength Indicator */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      disabled={isLoading}
                      className="w-full pl-10 pr-10 py-3 border border-[#D9E0E6] rounded-2xl text-xs text-[#102B46] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 transition-all bg-[#FAF9F6]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7896B2] hover:text-[#183653]"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <PasswordStrengthIndicator password={password} />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      disabled={isLoading}
                      className="w-full pl-10 pr-10 py-3 border border-[#D9E0E6] rounded-2xl text-xs text-[#102B46] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 transition-all bg-[#FAF9F6]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7896B2] hover:text-[#183653]"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-[#D9E0E6] text-[#183653] focus:ring-[#183653]"
                    />
                    <span className="text-xs text-[#4A647D] leading-relaxed">
                      I acknowledge the Reality AI{' '}
                      <span className="text-[#183653] underline">Terms of Service</span> and{' '}
                      <span className="text-[#183653] underline">Privacy Policy</span>.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 mt-4"
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Navigation to Login */}
              <div className="pt-4 border-t border-[#D9E0E6] text-center">
                <p className="text-xs text-[#4A647D]">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-[#183653] hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
