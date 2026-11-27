import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Eye, EyeOff, Lock, Mail, Phone, User, ArrowRight,
  AlertCircle, ShieldCheck, Sparkles, Building2
} from 'lucide-react';
import { Container, Button } from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validatePhone, validatePassword } from '../schemas/auth.schema';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { resolvePostAuthRedirect, sanitizeInternalRedirect } from '../utils/redirect';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signUp, signInWithGoogle, isConfigured } = useAuth();

  // Form fields (pre-fill email if redirected from Login)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [suggestLogin, setSuggestLogin] = useState(false);

  const loginUrl = (() => {
    const params = new URLSearchParams();
    if (email.trim()) params.set('email', email.trim());
    const redirectParam = searchParams.get('redirect');
    if (redirectParam) params.set('redirect', redirectParam);
    const qs = params.toString();
    return qs ? `/login?${qs}` : '/login';
  })();

  const handleGoogleSignUp = async () => {
    setErrorMessage(null);
    setSuggestLogin(false);
    setIsGoogleLoading(true);
    try {
      const targetRedirect = sanitizeInternalRedirect(
        (location.state as { from?: { pathname?: string } })?.from?.pathname ||
        searchParams.get('redirect')
      );
      const oauthCallbackUrl = targetRedirect
        ? `${window.location.origin}/login?redirect=${encodeURIComponent(targetRedirect)}`
        : `${window.location.origin}/login`;

      await signInWithGoogle({
        accountType: 'buyer',
        redirectTo: oauthCallbackUrl,
      });
    } catch (err: unknown) {
      setIsGoogleLoading(false);
      const message =
        err instanceof Error
          ? err.message
          : 'Google sign-up could not be initiated. Please check provider configuration.';
      setErrorMessage(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuggestLogin(false);

    if (!isConfigured) {
      setErrorMessage('Authentication service is unavailable until Supabase keys are configured.');
      return;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.isValid) {
      setErrorMessage(phoneCheck.error || 'Please enter a valid 10-digit telephone number.');
      return;
    }

    const passCheck = validatePassword(password);
    if (!passCheck.isValid) {
      setErrorMessage(passCheck.error || 'Password must be at least 8 characters with letters and numbers.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

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
        accountType: 'buyer',
      });

      if (result.needsEmailVerification) {
        navigate(`/verify-email?email=${encodeURIComponent(email.trim())}`);
      } else {
        const destination = resolvePostAuthRedirect(location.state, searchParams, '/');
        navigate(destination, { replace: true });
      }
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      const lower = rawMessage.toLowerCase();
      if (lower.includes('already registered') || lower.includes('already exists')) {
        setErrorMessage('An account with this email already exists. Please sign in instead.');
        setSuggestLogin(true);
      } else if (lower.includes('email rate limit') || lower.includes('over_email_send_rate_limit')) {
        setErrorMessage(
          'Supabase email confirmation limit reached. Turn off "Confirm email" in Supabase Auth -> Providers -> Email (or continue with Google) to register immediately.'
        );
      } else if (lower.includes('rate limit') || lower.includes('too many requests')) {
        setErrorMessage('Too many registration attempts. Please wait a moment and try again.');
      } else {
        setErrorMessage(rawMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-8 px-4 sm:px-6">
      <div className="max-w-4xl w-full mx-auto mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D] hover:text-[#183653] transition-colors py-1 px-2.5 rounded-full hover:bg-black/5"
        >
          <span className="text-sm leading-none">&larr;</span>
          <span>Back to Home</span>
        </Link>
      </div>
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
                  Explore and list architectural masterpieces.
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-3 leading-relaxed">
                  One unified Reality AI membership gives you full access to private residences, direct owner contacts, and your own property listings.
                </p>
              </div>
            </div>

            {/* Account benefits */}
            <div className="space-y-3 relative z-10 pt-8 border-t border-white/10 text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Private Architectural Dossiers &amp; Tours</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>List &amp; Manage Your Properties</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Supabase Protected Account Vault</span>
              </div>
            </div>

            {/* Specular Ambient Glow */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#354B60]/40 blur-3xl pointer-events-none" />
          </div>

          {/* Right Form Container (Span 7 on Desktop) */}
          <div className="col-span-1 md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">

              {/* Top Auth Mode Switcher */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F8F7F3] border border-[#D9E0E6]">
                <Link
                  to={loginUrl}
                  state={location.state}
                  className="text-center py-2 text-xs font-mono uppercase tracking-wider font-medium rounded-xl text-[#4A647D] hover:text-[#183653] transition-colors"
                >
                  Sign In
                </Link>
                <span className="text-center py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-xl bg-[#183653] text-white shadow-xs">
                  Sign Up
                </span>
              </div>

              {/* Header */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A647D] block mb-1">
                  Create Your Account
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183653] tracking-tight">
                  Join Reality AI
                </h1>
                <p className="text-xs text-[#4A647D] mt-1">
                  Register once to browse estates and manage your listed properties.
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
                <div
                  role="alert"
                  className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span className="font-medium">{errorMessage}</span>
                  </div>
                  {suggestLogin && (
                    <div className="pl-6">
                      <Link
                        to={loginUrl}
                        state={location.state}
                        className="inline-flex items-center gap-1 text-[#183653] font-semibold underline hover:no-underline"
                      >
                        <span>Go to Sign In</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Google Sign-Up Provider */}
                <div className="space-y-4 pt-1">
                  <GoogleSignInButton
                    onSignIn={handleGoogleSignUp}
                    isLoading={isGoogleLoading}
                    disabled={isLoading || isGoogleLoading || !isConfigured}
                    text="Continue with Google"
                  />

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-[#D9E0E6] w-full" />
                    <span className="bg-white px-3 text-[10px] font-mono uppercase tracking-widest text-[#7896B2] shrink-0">
                      Or register with email
                    </span>
                    <div className="border-t border-[#D9E0E6] w-full" />
                  </div>
                </div>

                {/* Full Legal Name */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maya Rao"
                      disabled={isLoading}
                      className="w-full pl-10 pr-3.5 py-3 border border-[#D9E0E6] rounded-2xl text-xs text-[#102B46] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 transition-all bg-[#FAF9F6]"
                    />
                  </div>
                </div>

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
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
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
                      autoComplete="tel"
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
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 chars with letter & number"
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
                      autoComplete="new-password"
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
                  disabled={isLoading || isGoogleLoading || !isConfigured}
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
                    to={loginUrl}
                    state={location.state}
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
