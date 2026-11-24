import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, Mail, Phone, User, ArrowRight, 
  CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Badge, Button, Card } from '../../../components/ui';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Validation & Submit Handler
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Name validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // 3. Phone validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit telephone number.');
      return;
    }

    // 4. Password validation
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    // 5. Confirm password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please acknowledge the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      setSignupSuccess(true);
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 border border-[#E7E6DF] bg-white shadow-[0_4px_24px_rgba(24,61,48,0.06)] overflow-hidden rounded-3xl shadow-2xl">
          
          {/* Left Architectural Brand Banner (Span 5 on Desktop) */}
          <div className="hidden md:flex md:col-span-5 bg-[#183D30] text-[#F7F6F2] p-8 lg:p-10 flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="w-7 h-7 rounded-2xl border border-[#A7B9A5] flex items-center justify-center font-serif text-sm font-bold text-white">
                  R
                </span>
                <span className="font-serif text-xl tracking-tight font-semibold text-white">
                  REALITY
                </span>
              </Link>
              <div className="pt-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5] block mb-1">
                  Join the Network
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl font-normal leading-snug text-white">
                  List and discover architectural residences.
                </h2>
              </div>
            </div>

            <div className="relative z-10 space-y-3 pt-8 border-t border-[#315B49] text-xs font-light text-[#A7B9A5]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A7B9A5] shrink-0" />
                <span>Direct WhatsApp and phone leads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A7B9A5] shrink-0" />
                <span>Zero brokerage fees on transactions</span>
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

          {/* Right Signup Form (Span 7 on Desktop) */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#737970]">
                    Create Account
                  </span>
                  <Badge variant="subtle" size="sm" className="bg-[#E8EDE7] text-[#183D30] border border-[#A7B9A5]/50">
                    Instant Access
                  </Badge>
                </div>
                <h1 className="font-serif text-3xl text-[#183D30] font-normal tracking-tight">
                  Join Reality AI
                </h1>
                <p className="text-xs text-[#737970] font-light">
                  Create your profile to list properties, receive direct buyer leads, and save residences.
                </p>
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
              {signupSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-[#E8EDE7] border border-[#A7B9A5] text-[#183D30] space-y-3 rounded-2xl text-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#315B49] mx-auto" />
                  <div className="font-serif text-xl font-semibold">
                    Account Registered Successfully
                  </div>
                  <p className="text-xs text-[#202520] font-light max-w-sm mx-auto leading-relaxed">
                    Welcome to Reality AI, <strong>{fullName}</strong>. Your patron account has been registered and verified successfully.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/properties')}
                    >
                      Browse Marketplace
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/sell')}
                    >
                      List a Property
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Signup Form */
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Rao"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white placeholder:text-[#A7B9A5]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="you@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white placeholder:text-[#A7B9A5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98450 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white placeholder:text-[#A7B9A5]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-9 pr-9 py-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white placeholder:text-[#A7B9A5]"
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

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-9 pr-9 py-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white placeholder:text-[#A7B9A5]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737970] hover:text-[#202520] cursor-pointer"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <label className="flex items-start gap-2 text-xs text-[#737970] cursor-pointer pt-1 font-light leading-relaxed">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="accent-[#183D30] mt-0.5 cursor-pointer"
                    />
                    <span>
                      I agree to the <a href="#terms" className="text-[#183D30] underline">Terms of Service</a> and <a href="#privacy" className="text-[#183D30] underline">Privacy Policy</a> of Reality AI.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#183D30] hover:bg-[#315B49] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-2"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Switch to Login */}
            <div className="pt-6 border-t border-[#E7E6DF] text-center text-xs text-[#737970] mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#183D30] font-semibold hover:underline">
                Sign in to your portal &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
