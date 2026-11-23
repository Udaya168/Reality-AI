import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle2,
  AlertCircle, ShieldCheck, Sparkles, Building2, ArrowLeft,
  KeyRound, Send, UserCheck, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Badge, Button, Card } from '../components/ui';
import { useAuth } from '../context/AuthContext';

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

  // Quick fill demo account credentials
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
        setLoginSuccess({
          name: result.user.name,
          role: result.user.role,
          redirect: result.redirectPath,
        });

        // Redirect after brief delay
        setTimeout(() => {
          navigate(result.redirectPath!);
        }, 900);
      } else {
        setErrorMessage(result.error || 'Invalid credentials. Please select one of the demo accounts below.');
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
        <div className="grid grid-cols-1 md:grid-cols-12 border border-[#E7E6DF] bg-white shadow-[0_4px_24px_rgba(24,61,48,0.06)] overflow-hidden rounded-[1px]">

          {/* Left Architectural Brand Banner (Span 5 on Desktop) */}
          <div className="hidden md:flex md:col-span-5 bg-[#183D30] text-[#F7F6F2] p-8 lg:p-10 flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="w-7 h-7 rounded-[1px] border border-[#A7B9A5] flex items-center justify-center font-serif text-sm font-bold text-white">
                  R
                </span>
                <span className="font-serif text-xl tracking-tight font-semibold text-white">
                  REALITY
                </span>
              </Link>
              <div className="pt-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5] block mb-1">
                  Demo Authentication
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl font-normal leading-snug text-white">
                  Dignified spaces. Direct connections.
                </h2>
              </div>
            </div>

            <div className="relative z-10 space-y-3 pt-8 border-t border-[#315B49] text-xs font-light text-[#A7B9A5]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A7B9A5] shrink-0" />
                <span>Frontend prototype mode with instant role switching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A7B9A5] shrink-0" />
                <span>Buyer, Seller, and Admin accounts pre-configured</span>
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
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#737970]">
                    Authentication Portal
                  </span>
                  <Badge variant="subtle" size="sm">
                    Demo Mode Active
                  </Badge>
                </div>
                <h1 className="font-serif text-3xl text-[#183D30] font-normal tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xs text-[#737970] font-light">
                  Sign in with any of our 3 testing roles to explore specific platform workflows.
                </p>
              </div>

              {/* Demo Accounts Quick-Fill Box */}
              <div className="p-4 bg-[#F7F6F2] border border-[#E7E6DF] rounded-[1px] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#183D30]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#315B49]" />
                    Demo Accounts (Click to Fill &amp; Sign In)
                  </span>
                  <span className="text-[9px] text-[#737970]">Mock Auth</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {demoAccounts.map((acc) => {
                    return (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => handleQuickFill(acc.email, acc.password, true)}
                        className="text-left p-2.5 bg-white border border-[#E7E6DF] hover:border-[#183D30] hover:bg-[#183D30] hover:text-white group transition-all rounded-[1px] cursor-pointer shadow-2xs"
                      >
                        <div className="font-serif font-semibold text-xs text-[#183D30] group-hover:text-white flex items-center justify-between">
                          <span>{acc.user.role}</span>
                          <span className="text-[9px] font-mono opacity-60">1-Click</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#737970] group-hover:text-white/80 truncate mt-0.5">
                          {acc.email}
                        </div>
                        <div className="text-[9px] text-[#737970] group-hover:text-white/70 font-mono mt-0.5">
                          Pass: {acc.password}
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
                  className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 rounded-[1px]"
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
                  className="p-6 bg-[#E8EDE7] border border-[#A7B9A5] text-[#183D30] space-y-3 rounded-[1px] text-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#315B49] mx-auto" />
                  <div className="font-serif text-xl font-semibold">
                    Welcome back, {loginSuccess.name}!
                  </div>
                  <p className="text-xs text-[#202520] font-light max-w-sm mx-auto leading-relaxed">
                    Signed in as <strong className="font-mono text-[#183D30] uppercase">[{loginSuccess.role}]</strong> in local frontend demo mode. Redirecting to your dashboard...
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
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="buyer@demo.com, seller@demo.com, or admin@demo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-[1px] bg-white placeholder:text-[#A7B9A5]"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970]">
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[11px] text-[#183D30] hover:underline font-light cursor-pointer"
                      >
                        Demo Hint
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Buyer123 / Seller123 / Admin123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-[1px] bg-white placeholder:text-[#A7B9A5]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737970] hover:text-[#202520] cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#737970]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-[#183D30] cursor-pointer"
                      />
                      <span>Persist demo session in browser</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 text-xs uppercase font-mono tracking-wider font-semibold cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying Demo Session...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Sign In with Demo Account</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </Button>
                </form>
              )}

              {/* Already logged in indicator if user is already signed in */}
              {isAuthenticated && user && !loginSuccess && (
                <div className="p-3 bg-[#F7F6F2] border border-[#E7E6DF] rounded-[1px] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#737970]">Currently logged in as: </span>
                    <strong className="text-[#183D30]">{user.name}</strong> ({user.role})
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
            <div className="pt-6 border-t border-[#E7E6DF] text-center text-xs text-[#737970] space-y-2">
              <div>
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#183D30] font-medium hover:underline">
                  Sign up for testing
                </Link>
              </div>
              <div className="text-[10px] text-[#A7B9A5] font-mono">
                SECURITY DISCLOSURE: Local frontend mock state only &bull; No remote credentials transmitted
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E7E6DF] p-6 max-w-md w-full rounded-[1px] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
              <h3 className="font-serif text-xl text-[#183D30]">Demo Account Credentials</h3>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-[#737970] hover:text-[#202520] text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#737970] leading-relaxed">
              Use any of the following 3 built-in demo credentials to log in:
            </p>
            <div className="space-y-2 text-xs font-mono bg-[#F7F6F2] p-3 border border-[#E7E6DF]">
              <div><strong>Buyer:</strong> buyer@demo.com / Buyer123</div>
              <div><strong>Seller:</strong> seller@demo.com / Seller123</div>
              <div><strong>Admin:</strong> admin@demo.com / Admin123</div>
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
