/**
 * Auth redirect utilities with strict open-redirect protection.
 */

const BLOCKED_AUTH_PATHS = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

/**
 * Validates that a redirect target is a strictly internal application path.
 * Accepts relative paths like "/properties" or shorthand slugs like "properties".
 */
export const sanitizeInternalRedirect = (rawPath: string | null | undefined): string | null => {
  if (!rawPath || typeof rawPath !== 'string') {
    return null;
  }

  let candidate = rawPath.trim();
  if (!candidate) return null;

  // Reject schemes, protocol-relative URLs, backslashes, or authority markers
  if (
    candidate.includes('://') ||
    candidate.startsWith('//') ||
    candidate.includes('\\') ||
    candidate.includes('@') ||
    /^[a-zA-Z]+:/.test(candidate)
  ) {
    return null;
  }

  // Normalize shorthand slug (e.g. ?redirect=properties -> /properties)
  if (!candidate.startsWith('/')) {
    candidate = `/${candidate}`;
  }

  // Strip control characters and validate same-origin URL parsing
  try {
    const parsed = new URL(candidate, 'https://reality.local');
    if (parsed.origin !== 'https://reality.local') {
      return null;
    }

    const normalized = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    const isAuthRoute = BLOCKED_AUTH_PATHS.some((p) => parsed.pathname === p || parsed.pathname.startsWith(`${p}/`));
    if (isAuthRoute) {
      return null;
    }

    return normalized;
  } catch {
    return null;
  }
};

/**
 * Resolves the safest post-authentication redirect path from router state or query parameters.
 */
export const resolvePostAuthRedirect = (
  locationState: unknown,
  searchParams: URLSearchParams,
  roleFallback: string
): string => {
  const fromObj = (locationState as { from?: { pathname?: string; search?: string } } | null)?.from;
  const fromPath = fromObj?.pathname
    ? `${fromObj.pathname}${fromObj.search || ''}`
    : null;

  const queryRedirect = searchParams.get('redirect');

  return (
    sanitizeInternalRedirect(fromPath) ||
    sanitizeInternalRedirect(queryRedirect) ||
    roleFallback
  );
};
