/**
 * Design Tokens for Reality AI
 * Architectural, editorial, and minimal luxury aesthetic
 */

export const tokens = {
  colors: {
    background: '#F7F6F2', // Warm Ivory / Gallery Canvas
    surface: '#FFFFFF', // Clean White
    surfaceSubtle: '#F0EFE9', // Light warm grey
    primary: '#183D30', // Deep Forest Green
    primaryHover: '#122D24', // Darker Forest Green
    secondary: '#315B49', // Mid Forest Green
    sage: '#A7B9A5', // Muted Sage
    sageLight: '#E8EDE7', // Soft Sage Tint
    textPrimary: '#202520', // Dark Charcoal
    textSecondary: '#737970', // Muted Slate Green
    textTertiary: '#9DA39A', // Subtle Grey
    border: '#E7E6DF', // Architectural Neutral Line
    borderStrong: '#D1D0C7', // Stronger Neutral Line
    borderFocus: '#183D30', // Forest Green Accent Line
  },
  typography: {
    fontSerif: '"DM Serif Display", "Playfair Display", Georgia, serif',
    fontSans: '"Manrope", system-ui, -apple-system, sans-serif',
    fontMono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  },
  spacing: {
    gutterMobile: '1rem',
    gutterDesktop: '2rem',
    sectionSm: '3rem',
    sectionMd: '5rem',
    sectionLg: '7rem',
  },
  borders: {
    radiusNone: '0px',
    radiusSm: '2px',
    radiusMd: '4px',
  },
  shadows: {
    subtle: '0 1px 3px rgba(32, 37, 32, 0.04)',
    elevated: '0 4px 12px rgba(24, 61, 48, 0.06)',
  }
} as const;
