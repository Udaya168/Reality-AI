import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle2,
  AlertCircle, ShieldCheck, Sparkles, Building2, ArrowLeft,
  KeyRound, Send, UserCheck, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Badge, Button, Card } from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithCredentials, demoAccounts, user, isAuthenticated, logout } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Interaction feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<{ name: string; role: string; redirect: string } | null>(null);

  // Forgot password modal state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Quick fill verified account credentials
  const handleQuickFill = (demoEmail: string, demoPass: string, autoSubmit = false) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);

    if (autoSubmit) {
      executeLogin(demoEmail, demoPass);
    }
  };

  const executeLogin = (userEmail: string, userPass: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const result = loginWithCredentials(userEmail, userPass);
      setIsLoading(false);

      if (result.success && result.user && result.redirectPath) {
        // Buyer accounts always land on the personalized Home page ('/')
        const destination = result.user.role === 'Buyer' ? '/' : result.redirectPath;

        setLoginSuccess({
          name: result.user.name,
          role: result.user.role,
          redirect: destination,
        });

        // Redirect after brief delay
        setTimeout(() => {
          navigate(destination);
        }, 900);
      } else {
        setErrorMessage(result.error || 'Invalid credentials. Please verify your email and password.');
      }
    }, 400);
  };

  // Form Submit Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    executeLogin(email, password);
  };

  // Forgot Password Submit Handler
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setForgotSubmitted(false);
      setShowForgotPassword(false);
      setForgotEmail('');
    }, 4000);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 border border-[#D9E0E6] bg-white shadow-[0_4px_24px_rgba(24,54,83,0.06)] overflow-hidden rounded-3xl shadow-2xl">

          {/* Left Architectural Brand Banner (Span 5 on Desktop) */}
          <div className="hidden md:flex md:col-span-5 bg-[#183653] text-[#F8F7F3] p-8 lg:p-10 flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="w-7 h-7 rounded-2xl border border-[#7896B2] flex items-center justify-center font-serif text-sm font-bold text-white">
                  R
                </span>
                <span className="font-serif text-xl tracking-tight font-semibold text-white">
                  REALITY
                </span>
              </Link>
              <div className="pt-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7896B2] block mb-1">
                  Client Access Portal
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl font-normal leading-snug text-white">
                  Dignified spaces. Direct connections.
                </h2>
              </div>
            </div>

            <div className="relative z-10 space-y-3 pt-8 border-t border-[#315D82] text-xs font-light text-[#7896B2]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>End-to-end encrypted private client sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7896B2] shrink-0" />
                <span>Direct concierge &amp; verified architectural ownership</span>
              </div>
            </div>

            {/* Geometric architectural pattern background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full border-l border-white grid grid-cols-2 grid-rows-3">
                <div className="border-b border-white" />
                <div className="border-b border-l border-white" />
                <div className="border-b border-white" />
                <div className="border-b border-l border-white" />
                <div />
                <div className="border-l border-white" />
              </div>
            </div>
          </div>

          {/* Right Login Form (Span 7 on Desktop) */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">

              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#354B60]">
                    Client Gateway
                  </span>
                  <Badge variant="subtle" size="sm" className="bg-[#DCE7F0] text-[#183653] border border-[#7896B2]/50">
                    Encrypted Access
                  </Badge>
                </div>
                <h1 className="font-serif text-3xl text-[#183653] font-normal tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xs text-[#354B60] font-light">
                  Enter your credentials to access your private real estate portfolio and collection.
                </p>
              </div>

              {/* Verified Access Profiles Selector */}
              <div className="p-3.5 bg-[#F8F7F3] border border-[#D9E0E6] rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#183653]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#315D82]" />
                    Verified Profiles (Quick Access)
                  </span>
                  <span className="text-[9px] text-[#354B60] font-mono">1-Click Sign In</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {demoAccounts.map((acc) => {
                    return (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => handleQuickFill(acc.email, acc.password, true)}
                        className="text-left p-2.5 bg-white border border-[#D9E0E6] hover:border-[#183653] hover:bg-[#183653] hover:text-white group transition-all rounded-xl cursor-pointer shadow-2xs"
                      >
                        <div className="font-serif font-semibold text-xs text-[#183653] group-hover:text-white flex items-center justify-between">
                          <span>{acc.user.role === 'Owner' ? 'Seller' : acc.user.role}</span>
                          <span className="text-[9px] font-mono opacity-60">1-Click</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#354B60] group-hover:text-white/80 truncate mt-0.5">
                          {acc.email}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 rounded-2xl"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Success Notification */}
              {loginSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-[#DCE7F0] border border-[#7896B2] text-[#183653] space-y-3 rounded-2xl text-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#315D82] mx-auto" />
                  <div className="font-serif text-xl font-semibold">
                    Welcome back, {loginSuccess.name}!
                  </div>
                  <p className="text-xs text-[#102B46] font-light max-w-sm mx-auto leading-relaxed">
                    Authenticated as <strong className="font-mono text-[#183653] uppercase">[{loginSuccess.role}]</strong>. Redirecting to your dashboard...
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(loginSuccess.redirect)}
                    >
                      Proceed Now ({loginSuccess.redirect})
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Login Form */
                <form onSubmit={handleLoginSubmit} className="space-y-4">

                  {/* Email Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#354B60] mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#354B60] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="client@realityai.estate"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#354B60]">
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[11px] text-[#183653] hover:underline font-light cursor-pointer"
                      >
                        Need Help?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#354B60] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white placeholder:text-[#7896B2]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#354B60] hover:text-[#102B46] cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#354B60]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-[#183653] cursor-pointer"
                      />
                      <span>Remember my credentials on this device</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 px-8 text-xs uppercase font-mono tracking-wider font-semibold rounded-full cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying Credentials...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Sign In to Portfolio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </Button>
                </form>
              )}

              {/* Already logged in indicator if user is already signed in */}
              {isAuthenticated && user && !loginSuccess && (
                <div className="p-3 bg-[#F8F7F3] border border-[#D9E0E6] rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#354B60]">Currently logged in as: </span>
                    <strong className="text-[#183653]">{user.name}</strong> ({user.role})
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs font-mono text-rose-700 hover:underline cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Disclaimer */}
            <div className="pt-6 border-t border-[#D9E0E6] text-center text-xs text-[#354B60] space-y-2">
              <div>
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#183653] font-medium hover:underline">
                  Create an Account
                </Link>
              </div>
              <div className="text-[10px] text-[#7896B2] font-mono">
                Protected by 256-bit encryption &bull; Reality AI Private Client Network
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#D9E0E6] p-6 max-w-md w-full rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#D9E0E6] pb-3">
              <h3 className="font-serif text-xl text-[#183653]">Verified Account Profiles</h3>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-[#354B60] hover:text-[#102B46] text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#354B60] leading-relaxed">
              Use any of the following verified credentials to access your specific portal:
            </p>
            <div className="space-y-2 text-xs font-mono bg-[#F8F7F3] p-3 border border-[#D9E0E6] rounded-xl">
              <div><strong>Buyer:</strong> buyer@realityai.estate / Buyer123</div>
              <div><strong>Seller:</strong> seller@realityai.estate / Seller123</div>
              <div><strong>Admin:</strong> admin@realityai.estate / Admin123</div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowForgotPassword(false)}
              className="w-full"
            >
              Understood
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
