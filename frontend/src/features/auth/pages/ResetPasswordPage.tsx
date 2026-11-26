import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Button, Card } from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { validatePassword } from '../schemas/auth.schema';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updatePassword, session, isLoading: authBooting } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check for expired/invalid token errors in URL query or hash
  useEffect(() => {
    const queryError = searchParams.get('error') || searchParams.get('error_description');
    const hash = window.location.hash;
    if (queryError || (hash && hash.includes('error='))) {
      setErrorMessage('The password reset link is invalid or has expired. Please request a new one.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!authBooting && !session?.access_token) {
      setErrorMessage('Your recovery session has expired or is missing. Please request a new password reset link.');
      return;
    }

    const check = validatePassword(password);
    if (!check.isValid) {
      setErrorMessage(check.error || 'Password must be at least 8 characters with a letter and number.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update password. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="max-w-md mx-auto">
          <Card className="p-8 sm:p-10 border border-[#D9E0E6] bg-white shadow-[0_8px_30px_rgba(24,54,83,0.08)] rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-[#183653]/10 text-[#183653] flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A647D] block">
                Security Update
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183653] tracking-tight">
                Choose a new password
              </h1>
              <p className="text-xs text-[#4A647D] leading-relaxed">
                Choose a robust password to safeguard your Reality AI architectural portfolio.
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 rounded-2xl bg-[#183653]/5 border border-[#183653]/15 text-[#183653] text-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#183653]" />
                    <span>Password updated successfully</span>
                  </div>
                  <p className="text-[#354B60] leading-relaxed">
                    Your password has been securely updated in Supabase. Redirecting you to sign in...
                  </p>
                </div>

                <Link to="/login">
                  <Button variant="primary" className="w-full">
                    Proceed to Sign In
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    New Password *
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

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#7896B2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
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

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 mt-4"
                >
                  {isLoading ? (
                    <span>Updating Password...</span>
                  ) : (
                    <>
                      <span>Save New Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[#D9E0E6] flex items-center justify-center gap-1.5 text-xs text-[#4A647D]">
              <ShieldCheck className="w-4 h-4 text-[#183653]" />
              <span>Encrypted End-to-End</span>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};
