import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

/**
 * Top-level Error Boundary preventing uncaught runtime/auth rendering failures
 * from crashing the application to a blank screen.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected application error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[Reality AI ErrorBoundary]', error, info.componentStack);
  }

  handleReload = (): void => {
    this.setState({ hasError: false, errorMessage: null });
    window.location.href = '/';
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white border border-[#D9E0E6] rounded-3xl p-8 text-center shadow-[0_8px_32px_rgba(24,54,83,0.08)] space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A647D] block">
                Application Recovery
              </span>
              <h1 className="font-serif text-2xl font-semibold text-[#183653]">
                Something went wrong
              </h1>
              <p className="text-xs text-[#4A647D] leading-relaxed">
                Reality AI prevented a crash while processing your request. You can safely return home and continue.
              </p>
              {this.state.errorMessage && (
                <p className="text-[11px] font-mono text-red-700 bg-red-50 border border-red-200 rounded-xl p-2.5 break-words">
                  {this.state.errorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#183653] text-white py-2.5 px-4 rounded-2xl text-xs font-mono uppercase tracking-wider hover:bg-[#102B46] transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-[#D9E0E6] text-[#183653] py-2.5 px-4 rounded-2xl text-xs font-mono uppercase tracking-wider hover:border-[#183653] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
