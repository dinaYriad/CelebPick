export const COLORS = {
  primary: '#6200EE',
  primaryDark: '#3700B3',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#B00020',
  success: '#4CAF50',
  highlight: '#FFF9C4', // Latest score background
  highlightBorder: '#FFD54F', // Latest score border
  text: {
    primary: '#000000',
    secondary: '#757575',
    onPrimary: '#FFFFFF',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600' as const,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
};

export const LAYOUT = {
  optionImageSize: { width: 160, height: 160 },
  promptImageSize: { width: 200, height: 200 },
  borderRadius: 8,
  buttonHeight: 60,
};
