import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle2, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Container, Button, Card } from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const { resendVerification } = useAuth();

  const [email] = useState(emailParam);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    setResending(true);
    setErrorMessage(null);
    setResendSuccess(false);

    try {
      await resendVerification(email);
      setResendSuccess(true);
      setCooldown(60);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resend confirmation email.';
      setErrorMessage(msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="max-w-md mx-auto">
          <Card className="p-8 sm:p-10 border border-[#D9E0E6] bg-white shadow-[0_8px_30px_rgba(24,54,83,0.08)] rounded-3xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#183653]/10 text-[#183653] flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A647D] block mb-2">
              Email Verification
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183653] tracking-tight mb-3">
              Verify your email
            </h1>
            <p className="text-xs text-[#4A647D] leading-relaxed mb-6">
              We dispatched an authentication confirmation email to{' '}
              <strong className="text-[#183653]">{email || 'your email'}</strong>. Please click the link inside to activate your Reality AI credentials.
            </p>

            {resendSuccess && (
              <div className="mb-6 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Verification email resent successfully!</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={resending || cooldown > 0}
                className="w-full flex items-center justify-center gap-2 py-3"
              >
                <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
                <span>
                  {cooldown > 0
                    ? `Resend available in ${cooldown}s`
                    : resending
                    ? 'Resending...'
                    : 'Resend Verification Email'}
                </span>
              </Button>

              <Link to="/login" className="block">
                <Button variant="primary" className="w-full py-3">
                  Back to Sign In
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D9E0E6]">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4A647D] hover:text-[#183653] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO EXPLORATION HOMEPAGE</span>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};
