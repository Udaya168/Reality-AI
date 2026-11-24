import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Button, Card } from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail } from '../schemas/auth.schema';

export const ForgotPasswordPage: React.FC = () => {
  const { sendPasswordReset, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordReset(email);
      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to send reset link. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4A647D] hover:text-[#183653] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SIGN IN</span>
          </Link>

          <Card className="p-8 sm:p-10 border border-[#D9E0E6] bg-white shadow-[0_8px_30px_rgba(24,54,83,0.08)] rounded-3xl">
            {/* Architectural Icon Header */}
            <div className="w-12 h-12 rounded-2xl bg-[#183653]/10 text-[#183653] flex items-center justify-center mb-6">
              <KeyRound className="w-6 h-6" />
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A647D] block">
                Account Recovery
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183653] tracking-tight">
                Reset your password
              </h1>
              <p className="text-xs text-[#4A647D] leading-relaxed">
                Enter the email address registered with your Reality AI account. We’ll email you an authenticated recovery link.
              </p>
            </div>

            {!isConfigured && (
              <div className="mb-6 p-3 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Supabase environment keys are pending. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
                </span>
              </div>
            )}

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 rounded-2xl bg-[#183653]/5 border border-[#183653]/15 text-[#183653] text-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#183653]" />
                    <span>Reset email dispatched</span>
                  </div>
                  <p className="text-[#354B60] leading-relaxed">
                    We sent a secure password reset link to <strong>{email}</strong>. Open the email and click the button to set a new password.
                  </p>
                </div>

                <div className="pt-2">
                  <Link to="/login">
                    <Button variant="primary" className="w-full">
                      Return to Sign In
                    </Button>
                  </Link>
                </div>
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
                    Account Email Address *
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

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 mt-2"
                >
                  {isLoading ? (
                    <span>Sending Recovery Link...</span>
                  ) : (
                    <>
                      <span>Send Recovery Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[#D9E0E6] flex items-center justify-center gap-1.5 text-xs text-[#4A647D]">
              <ShieldCheck className="w-4 h-4 text-[#183653]" />
              <span>Protected by Supabase Enterprise Cryptographic Security</span>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};
