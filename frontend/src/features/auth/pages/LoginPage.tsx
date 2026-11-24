import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle2,
  AlertCircle, ShieldCheck, Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Button } from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail } from '../schemas/auth.schema';
import { GoogleSignInButton } from '../components/GoogleSignInButton';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isVerifiedParam = searchParams.get('verified') === 'true';

  const { signIn, signInWithGoogle, isConfigured } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<{ name: string; role: string; redirect: string } | null>(null);

  // Detect OAuth error callbacks in URL query parameters or hash
  useEffect(() => {
    const errorParam = searchParams.get('error') || searchParams.get('error_description');
    if (errorParam) {
      const description = searchParams.get('error_description') || searchParams.get('error');
      setErrorMessage(
        description === 'access_denied'
          ? 'Google sign-in was cancelled.'
          : decodeURIComponent(description || 'Authentication failed. Please try again.')
      );
    } else if (window.location.hash.includes('error=')) {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const hashError = hashParams.get('error_description') || hashParams.get('error');
        if (hashError) {
          setErrorMessage(
            hashError === 'access_denied'
              ? 'Google sign-in was cancelled.'
              : decodeURIComponent(hashError)
          );
        }
      } catch {
        // Ignore hash parse errors
      }
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsGoogleLoading(true);
    try {
      const rawFrom = (location.state as { from?: { pathname: string } })?.from?.pathname;
      const redirectTo =
        rawFrom && rawFrom.startsWith('/') && !rawFrom.startsWith('//')
          ? `${window.location.origin}${rawFrom}`
          : `${window.location.origin}/login`;

      await signInWithGoogle({ redirectTo });
    } catch (err: unknown) {
      setIsGoogleLoading(false);
      const message =
        err instanceof Error
          ? err.message
          : 'Google sign-in could not be initiated. Please verify provider configuration.';
      setErrorMessage(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setUnconfirmedEmail(null);

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      // Validate destination against open redirect attacks
      const rawFrom = (location.state as { from?: { pathname: string } })?.from?.pathname;
      const isSafeInternalPath =
        typeof rawFrom === 'string' &&
        rawFrom.startsWith('/') &&
        !rawFrom.startsWith('//') &&
        rawFrom !== '/login' &&
        rawFrom !== '/signup' &&
        rawFrom !== '/forgot-password';

      const destination = isSafeInternalPath ? rawFrom : result.redirectPath;

      setLoginSuccess({
        name: result.user.user_metadata?.full_name || result.user.email?.split('@')[0] || 'User',
        role: result.role,
        redirect: destination,
      });

      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 700);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials. Please verify your email and password.';
      
      if (message.toLowerCase().includes('email not confirmed')) {
        setUnconfirmedEmail(email);
        setErrorMessage('Your email address has not been verified yet. Please check your inbox.');
      } else if (message.toLowerCase().includes('invalid login credentials')) {
        setErrorMessage('Invalid email or password. Please try again or reset your password.');
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
                  Private Portal
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl text-white font-medium leading-tight">
                  Welcome to the architectural collective.
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-3 leading-relaxed">
                  Sign in to manage your premium estates, track buyer inquiries, and curate architectural listings.
                </p>
              </div>
            </div>

            {/* Architectural Trust Points */}
            <div className="space-y-3 relative z-10 pt-8 border-t border-white/10 text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Supabase Protected Authentication</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Verified Buyer & Seller Accounts</span>
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
                  Access Reality AI
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183653] tracking-tight">
                  Sign In
                </h1>
                <p className="text-xs text-[#4A647D] mt-1">
                  Enter your verified account email and password to proceed.
                </p>
              </div>

              {/* Verified query param banner */}
              {isVerifiedParam && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Your email has been verified successfully. Please sign in.</span>
                </div>
              )}

              {/* Unconfigured Supabase Banner */}
              {!isConfigured && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                  <div>
                    <span className="font-semibold block">Supabase Connection Notice</span>
                    <span>
                      Please add your Supabase credentials to <code className="bg-amber-100 px-1 rounded">frontend/.env</code> to enable live authentication.
                    </span>
                  </div>
                </div>
              )}

              {/* Error Notice */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                  {unconfirmedEmail && (
                    <div className="pl-6 pt-1">
                      <Link
                        to={`/verify-email?email=${encodeURIComponent(unconfirmedEmail)}`}
                        className="text-[#183653] font-semibold underline hover:no-underline"
                      >
                        Resend verification email &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Success Transition */}
              {loginSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1"
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Welcome back, {loginSuccess.name}</span>
                  </div>
                  <p className="text-[#354B60]">
                    Redirecting to your personalized workspace...
                  </p>
                </motion.div>
              )}

              {/* Google OAuth Provider */}
              <div className="space-y-4">
                <GoogleSignInButton
                  onSignIn={handleGoogleSignIn}
                  isLoading={isGoogleLoading}
                  disabled={isLoading || isGoogleLoading || !isConfigured}
                />

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#D9E0E6] w-full" />
                  <span className="bg-white px-3 text-[10px] font-mono uppercase tracking-widest text-[#7896B2] shrink-0">
                    Or continue with email
                  </span>
                  <div className="border-t border-[#D9E0E6] w-full" />
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                      Password *
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-[11px] font-mono uppercase tracking-wider text-[#4A647D] hover:text-[#183653] transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter account password"
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
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#D9E0E6] text-[#183653] focus:ring-[#183653]"
                    />
                    <span className="text-xs text-[#4A647D]">Remember this workstation</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 mt-2"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Navigation to Signup */}
              <div className="pt-4 border-t border-[#D9E0E6] text-center">
                <p className="text-xs text-[#4A647D]">
                  Don’t have an authenticated account?{' '}
                  <Link
                    to="/signup"
                    className="font-semibold text-[#183653] hover:underline"
                  >
                    Create Account
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
