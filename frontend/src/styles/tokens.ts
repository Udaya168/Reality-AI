/**
 * Shared design tokens for Reality AI's architectural navy and warm-neutral theme.
 */
export const tokens = {
  colors: {
    background: '#F8F7F3',
    surface: '#FFFFFF',
    surfaceSubtle: '#EDF2F6',
    surfaceGlass: 'rgba(255, 255, 255, 0.76)',
    primary: '#183653',
    primaryHover: '#102B46',
    secondary: '#315D82',
    accent: '#7896B2',
    accentLight: '#DCE7F0',
    textPrimary: '#102B46',
    textSecondary: '#354B60',
    textTertiary: '#8493A1',
    border: '#D9E0E6',
    borderStrong: '#C5D0D9',
    borderFocus: '#315D82',
  },
  typography: {
    fontSerif: '"DM Serif Display", "Playfair Display", Georgia, serif',
    fontSans: '"Manrope", system-ui, -apple-system, sans-serif',
    fontMono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  },
  spacing: {
    gutterMobile: '1rem',
    gutterTablet: '1.5rem',
    gutterDesktop: '2rem',
    sectionSm: '3rem',
    sectionMd: '4.5rem',
    sectionLg: '6rem',
  },
  borders: {
    radiusSm: '0.5rem',
    radiusControl: '1rem',
    radiusCard: '1.5rem',
    radiusPill: '9999px',
  },
  shadows: {
    subtle: '0 1px 3px rgba(16, 43, 70, 0.04)',
    elevated: '0 8px 24px rgba(16, 43, 70, 0.06)',
    hover: '0 18px 40px rgba(16, 43, 70, 0.11)',
    floating: '0 18px 48px rgba(16, 43, 70, 0.12)',
  },
} as const;
