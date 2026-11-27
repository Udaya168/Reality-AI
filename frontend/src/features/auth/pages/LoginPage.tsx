import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Eye, EyeOff, Lock, Mail, Phone, User, ArrowRight, CheckCircle2,
  AlertCircle, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validatePhone, validatePassword } from '../schemas/auth.schema';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { resolvePostAuthRedirect, sanitizeInternalRedirect } from '../utils/redirect';

// High quality modern architectural villa photograph matching Design 6
const DESIGN_6_VILLA_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isVerifiedParam = searchParams.get('verified') === 'true';

  // Toggle mode: 'signin' or 'signup'
  const initialMode = searchParams.get('mode') === 'signup' || location.pathname === '/signup' ? 'signup' : 'signin';
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);

  const { signIn, signUp, signInWithGoogle, isConfigured } = useAuth();

  // Shared / Common Fields
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Specific Fields
  const [rememberMe, setRememberMe] = useState(false);

  // Sign Up Specific Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [suggestSignup, setSuggestSignup] = useState(false);
  const [suggestSignin, setSuggestSignin] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<{ name: string } | null>(null);

  // Sync mode if query param changes
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup') {
      setAuthMode('signup');
    } else if (modeParam === 'signin') {
      setAuthMode('signin');
    }
  }, [searchParams]);

  // Clear errors when toggling modes
  const handleModeSwitch = (newMode: 'signin' | 'signup') => {
    setAuthMode(newMode);
    setErrorMessage(null);
    setSuccessNotice(null);
    setSuggestSignup(false);
    setSuggestSignin(false);
    // Update URL query parameter smoothly without page reload
    const newParams = new URLSearchParams(searchParams);
    if (newMode === 'signup') {
      newParams.set('mode', 'signup');
    } else {
      newParams.delete('mode');
    }
    setSearchParams(newParams, { replace: true });
  };

  // Detect OAuth error callbacks in URL query parameters or hash
  useEffect(() => {
    const errorParam = searchParams.get('error') || searchParams.get('error_description');
    if (errorParam) {
      const description = searchParams.get('error_description') || searchParams.get('error');
      setErrorMessage(
        description === 'access_denied'
          ? 'Google authentication was cancelled.'
          : decodeURIComponent(description || 'Authentication failed. Please try again.')
      );
    } else if (window.location.hash.includes('error=')) {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const hashError = hashParams.get('error_description') || hashParams.get('error');
        if (hashError) {
          setErrorMessage(
            hashError === 'access_denied'
              ? 'Google authentication was cancelled.'
              : decodeURIComponent(hashError)
          );
        }
      } catch {
        // Ignore hash parse errors
      }
    }
  }, [searchParams]);

  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setSuggestSignup(false);
    setSuggestSignin(false);
    setUnconfirmedEmail(null);
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
          : 'Google authentication could not be initiated. Please check your configuration.';
      setErrorMessage(message);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuggestSignup(false);
    setUnconfirmedEmail(null);

    if (!isConfigured) {
      setErrorMessage('Authentication service is unavailable until Supabase keys are configured.');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Incorrect password / email.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn(email, password);
      const destination = resolvePostAuthRedirect(location.state, searchParams, result.redirectPath);

      setLoginSuccess({
        name: result.user.user_metadata?.full_name || result.user.email?.split('@')[0] || 'Member',
      });

      navigate(destination, { replace: true });
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : '';
      const lower = rawMessage.toLowerCase();

      if (lower.includes('email not confirmed')) {
        setUnconfirmedEmail(email.trim());
        setErrorMessage('Your email address has not been confirmed yet.');
      } else if (
        lower.includes('invalid login credentials') ||
        lower.includes('invalid_credentials') ||
        lower.includes('invalid password') ||
        lower.includes('user not found')
      ) {
        setErrorMessage('Incorrect password / email. Please verify your credentials and try again.');
        setSuggestSignup(true);
      } else if (lower.includes('rate limit') || lower.includes('too many requests')) {
        setErrorMessage('Too many failed sign-in attempts. Please wait a moment and try again.');
      } else if (lower.includes('failed to fetch') || lower.includes('network')) {
        setErrorMessage('Network error while connecting to Supabase. Please check your connection and try again.');
      } else {
        setErrorMessage(rawMessage || 'Incorrect password / email.');
        setSuggestSignup(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuggestSignin(false);

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
        setSuggestSignin(true);
      } else if (lower.includes('email rate limit') || lower.includes('over_email_send_rate_limit')) {
        setErrorMessage(
          'Supabase email confirmation limit reached. Please check back shortly or continue with Google.'
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
    <div className="relative min-h-screen lg:h-screen lg:max-h-[100dvh] w-full bg-[#F8F7F3] flex flex-col justify-between overflow-y-auto lg:overflow-hidden box-border">
      <div className="relative z-10 w-full flex-1 flex flex-col lg:flex-row lg:h-full box-border">
        {/* ========================================================================= */}
        {/* LEFT SECTION: Authentication Form & Header (Design 6 Layout)              */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col justify-between px-6 sm:px-12 lg:px-14 xl:px-18 py-5 lg:py-6 lg:h-full box-border">
          {/* Top Row: Back to Home aligned at top-left */}
          <div className="w-full max-w-[460px] mx-auto lg:mx-0 shrink-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D] hover:text-[#183653] transition-colors py-1 px-2.5 -ml-2.5 rounded-full hover:bg-black/5"
            >
              <span className="text-sm leading-none">&larr;</span>
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Form & Brand Content Container (max-w-[460px], vertically centered) */}
          <div className="my-auto py-2 sm:py-3 max-w-[460px] w-full mx-auto lg:mx-0 shrink-0">
            {/* REALITY ARCHITECTURAL Logo: Top-left aligned with form */}
            <div className="mb-3 lg:mb-4">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#183653] text-[#F8F7F3] flex items-center justify-center font-serif text-sm lg:text-base font-bold shadow-sm group-hover:scale-105 transition-transform duration-200 border border-white/20">
                  R
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base lg:text-lg tracking-tight font-semibold text-[#183653] leading-none">
                    REALITY
                  </span>
                  <span className="text-[7.5px] uppercase tracking-widest text-[#354B60] font-mono mt-0.5">
                    ARCHITECTURAL
                  </span>
                </div>
              </Link>
            </div>

            {/* Design 6 Segmented Two-Option Toggle (SIGN IN / SIGN UP) */}
            <div className="mb-3 lg:mb-3.5 p-1 rounded-full bg-[#EAE5DC]/60 border border-[#DDD5C7] flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => handleModeSwitch('signin')}
                className={`flex-1 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-[#183653] text-white shadow-sm'
                    : 'text-[#52687D] hover:text-[#183653]'
                }`}
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('signup')}
                className={`flex-1 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-[#183653] text-white shadow-sm'
                    : 'text-[#52687D] hover:text-[#183653]'
                }`}
              >
                SIGN UP
              </button>
            </div>

            {/* Header */}
            <div className="mb-3 lg:mb-3.5 space-y-0.5">
              <span className="text-[10px] font-['DM_Sans',system-ui,sans-serif] uppercase tracking-[0.2em] text-[#6B8296] font-medium block">
                {authMode === 'signin' ? 'WELCOME BACK' : 'JOIN THE ARCHITECTURAL NETWORK'}
              </span>
              <h1 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-semibold text-[#102B46] tracking-tight leading-tight">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </h1>
              <p className="text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D] font-normal leading-relaxed">
                {authMode === 'signin'
                  ? 'Unlock exclusive properties and personalized experiences.'
                  : 'Register to explore architectural residences and list properties.'}
              </p>
            </div>

            {/* Email Verified Banner */}
            {isVerifiedParam && (
              <div className="mb-3 p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-['DM_Sans',system-ui,sans-serif]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Your email has been verified successfully. Please sign in.</span>
              </div>
            )}

            {/* Unconfigured Supabase Banner */}
            {!isConfigured && (
              <div className="mb-3 p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 font-['DM_Sans',system-ui,sans-serif]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                <div>
                  <span className="font-semibold block">Supabase Configuration Notice</span>
                  <span>
                    Please configure live Supabase credentials in <code className="bg-amber-100 px-1 rounded">frontend/.env</code>.
                  </span>
                </div>
              </div>
            )}

            {/* Error Notification */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-3 p-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-1.5 font-['DM_Sans',system-ui,sans-serif]"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span className="font-medium">{errorMessage}</span>
                </div>
                {suggestSignup && (
                  <div className="pl-6 pt-0.5 flex flex-wrap items-center gap-2">
                    <span className="text-red-600/90">New to Reality AI?</span>
                    <button
                      type="button"
                      onClick={() => handleModeSwitch('signup')}
                      className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#183653] text-white text-[11px] font-semibold hover:bg-[#102B46] transition-colors cursor-pointer"
                    >
                      <UserPlus className="w-3 h-3" />
                      <span>Switch to Sign Up</span>
                    </button>
                  </div>
                )}
                {suggestSignin && (
                  <div className="pl-6 pt-0.5 flex flex-wrap items-center gap-2">
                    <span className="text-red-600/90">Already registered?</span>
                    <button
                      type="button"
                      onClick={() => handleModeSwitch('signin')}
                      className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#183653] text-white text-[11px] font-semibold hover:bg-[#102B46] transition-colors cursor-pointer"
                    >
                      <span>Switch to Sign In</span>
                    </button>
                  </div>
                )}
                {unconfirmedEmail && (
                  <div className="pl-6 pt-0.5">
                    <Link
                      to={`/verify-email?email=${encodeURIComponent(unconfirmedEmail)}`}
                      className="text-[#183653] font-semibold underline hover:no-underline"
                    >
                      Resend confirmation email &rarr;
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Success State */}
            {loginSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1 font-['DM_Sans',system-ui,sans-serif]"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Welcome, {loginSuccess.name}</span>
                </div>
                <p className="text-[#354B60]">
                  Redirecting to your architectural collection...
                </p>
              </motion.div>
            )}

            {/* Dynamic Form: Sign In vs Sign Up within the SAME card without page reload */}
            {authMode === 'signin' ? (
              /* ================= SIGN IN FORM ================= */
              <form onSubmit={handleSignInSubmit} className="space-y-2 lg:space-y-2.5" noValidate>
                {/* Email Address Field */}
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8A9BAA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-10.5 pl-10 pr-4 bg-white border border-[#E0D9CD] hover:border-[#C4B9A7] focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 rounded-2xl text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] text-[#102B46] placeholder:text-[#94A3B8] transition-all shadow-[0_2px_8px_rgba(24,54,83,0.02)] outline-none"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8A9BAA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-10.5 pl-10 pr-10 bg-white border border-[#E0D9CD] hover:border-[#C4B9A7] focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 rounded-2xl text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] text-[#102B46] placeholder:text-[#94A3B8] transition-all shadow-[0_2px_8px_rgba(24,54,83,0.02)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A9BAA] hover:text-[#183653] transition-colors p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between pt-0.5 text-xs font-['DM_Sans',system-ui,sans-serif]">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#52687D]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-[#C4B9A7] text-[#183653] focus:ring-[#183653] accent-[#183653] cursor-pointer"
                    />
                    <span>Remember Me</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#52687D] hover:text-[#183653] transition-colors font-medium hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Navy Sign In Button with Arrow */}
                <button
                  type="submit"
                  disabled={isLoading || isGoogleLoading || !isConfigured}
                  className="w-full h-11 py-2.5 px-6 rounded-full bg-[#183653] hover:bg-[#102B46] text-white text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer mt-1 disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* ================= SIGN UP FORM ================= */
              <form onSubmit={handleSignUpSubmit} className="space-y-2 lg:space-y-2.5" noValidate>
                {/* Full Legal Name */}
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A9BAA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Legal Name"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-10.5 pl-10 pr-4 bg-white border border-[#E0D9CD] hover:border-[#C4B9A7] focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 rounded-2xl text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] text-[#102B46] placeholder:text-[#94A3B8] transition-all shadow-[0_2px_8px_rgba(24,54,83,0.02)] outline-none"
                  />
                </div>

                {/* Email Address Field */}
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8A9BAA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-10.5 pl-10 pr-4 bg-white border border-[#E0D9CD] hover:border-[#C4B9A7] focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 rounded-2xl text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] text-[#102B46] placeholder:text-[#94A3B8] transition-all shadow-[0_2px_8px_rgba(24,54,83,0.02)] outline-none"
                  />
                </div>

                {/* Telephone Number */}
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8A9BAA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telephone Number"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-10.5 pl-10 pr-4 bg-white border border-[#E0D9CD] hover:border-[#C4B9A7] focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 rounded-2xl text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] text-[#102B46] placeholder:text-[#94A3B8] transition-all shadow-[0_2px_8px_rgba(24,54,83,0.02)] outline-none"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8A9BAA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min. 8 characters)"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-10.5 pl-10 pr-10 bg-white border border-[#E0D9CD] hover:border-[#C4B9A7] focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 rounded-2xl text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] text-[#102B46] placeholder:text-[#94A3B8] transition-all shadow-[0_2px_8px_rgba(24,54,83,0.02)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A9BAA] hover:text-[#183653] transition-colors p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8A9BAA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-10.5 pl-10 pr-10 bg-white border border-[#E0D9CD] hover:border-[#C4B9A7] focus:border-[#183653] focus:ring-2 focus:ring-[#183653]/10 rounded-2xl text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] text-[#102B46] placeholder:text-[#94A3B8] transition-all shadow-[0_2px_8px_rgba(24,54,83,0.02)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A9BAA] hover:text-[#183653] transition-colors p-1"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Navy Create Account Button with Arrow */}
                <button
                  type="submit"
                  disabled={isLoading || isGoogleLoading || !isConfigured}
                  className="w-full h-11 py-2.5 px-6 rounded-full bg-[#183653] hover:bg-[#102B46] text-white text-xs sm:text-sm font-['DM_Sans',system-ui,sans-serif] font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer mt-1 disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-2 lg:my-2.5">
              <div className="border-t border-[#E3DBD0] w-full" />
              <span className="bg-[#F8F7F3] px-3 text-[10px] font-['DM_Sans',system-ui,sans-serif] uppercase tracking-widest text-[#8493A1] shrink-0 font-medium">
                OR
              </span>
              <div className="border-t border-[#E3DBD0] w-full" />
            </div>

            {/* Continue with Google Button */}
            <div>
              <GoogleSignInButton
                onSignIn={handleGoogleAuth}
                isLoading={isGoogleLoading}
                disabled={isLoading || isGoogleLoading || !isConfigured}
                className="h-11 min-h-[2.75rem] py-2.5"
              />
            </div>

            {/* Bottom Link to Switch Between Sign In and Sign Up */}
            <div className="pt-2 lg:pt-3 text-center">
              {authMode === 'signin' ? (
                <p className="text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D]">
                  New to Reality AI?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('signup')}
                    className="font-semibold text-[#183653] hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p className="text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('signin')}
                    className="font-semibold text-[#183653] hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Bottom subtle copyright / disclaimer */}
          <div className="w-full max-w-[460px] mx-auto lg:mx-0 pt-2 lg:pt-3 text-center lg:text-left text-[10.5px] font-['DM_Sans',system-ui,sans-serif] text-[#8493A1] shrink-0">
            <span>&copy; {new Date().getFullYear()} Reality Architectural. All rights reserved.</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SECTION: Architectural Villa Frame with subtle curve (Design 6)     */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-[52%] xl:w-[55%] relative min-h-[360px] sm:min-h-[440px] lg:h-full flex items-center justify-center lg:justify-end p-4 sm:p-6 lg:p-6 lg:pr-8 box-border overflow-hidden">
          {/* Subtle curved image container - fills available viewport height naturally without distortion */}
          <div
            className="relative w-full h-[340px] sm:h-[440px] lg:h-full max-h-[calc(100dvh-3rem)] rounded-[2rem] lg:rounded-l-[3.5rem] lg:rounded-r-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-[#E8EDF0]"
          >
            <img
              src={DESIGN_6_VILLA_IMAGE}
              alt="Contemporary Architectural Villa"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Soft ambient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
