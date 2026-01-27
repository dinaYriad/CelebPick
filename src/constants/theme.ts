// ✨ Dreamy Pastel Color Palette ✨
export const COLORS = {
  // Primary: Soft Lavender/Purple gradient
  primary: '#B794F6',        // Soft lavender
  primaryDark: '#9F7AEA',    // Medium purple
  primaryLight: '#E9D8FD',   // Very light lavender

  // Secondary: Peachy Pink
  secondary: '#FBB6CE',      // Soft pink
  secondaryDark: '#F687B3',  // Medium pink
  secondaryLight: '#FED7E2', // Very light pink

  // Accent: Mint/Teal
  accent: '#81E6D9',         // Soft mint
  accentDark: '#4FD1C5',     // Medium teal
  accentLight: '#C6F6D5',    // Very light mint

  // Sunny: Warm peachy yellow
  sunny: '#FBBF24',          // Warm yellow
  sunnyLight: '#FDE68A',     // Light yellow

  // Sky: Soft blue
  sky: '#93C5FD',            // Soft blue
  skyLight: '#DBEAFE',       // Very light blue

  // Background gradients (pastel dream)
  background: '#FFFFFF',
  gradients: {
    primary: ['#E9D8FD', '#FED7E2', '#DBEAFE'],     // Lavender → Pink → Sky
    secondary: ['#FED7E2', '#FDE68A', '#C6F6D5'],   // Pink → Yellow → Mint
    accent: ['#DBEAFE', '#C6F6D5', '#E9D8FD'],      // Sky → Mint → Lavender
    warm: ['#FDE68A', '#FED7E2', '#E9D8FD'],        // Yellow → Pink → Lavender
  },

  // Surface colors
  surface: '#F7FAFC',        // Very light gray
  surfaceElevated: '#FFFFFF',
  card: 'rgba(255, 255, 255, 0.9)',  // Semi-transparent white
  cardBorder: 'rgba(255, 255, 255, 0.3)',

  // Semantic colors (soft versions)
  success: '#68D391',        // Soft green
  successLight: '#C6F6D5',   // Very light green
  successGlow: 'rgba(104, 211, 145, 0.4)',

  error: '#FC8181',          // Soft red
  errorLight: '#FED7D7',     // Very light red
  errorGlow: 'rgba(252, 129, 129, 0.4)',

  warning: '#F6AD55',        // Soft orange

  // Highlight (for latest score)
  highlight: '#FEF5E7',      // Warm cream
  highlightBorder: '#F6AD55', // Soft orange border
  highlightGlow: 'rgba(246, 173, 85, 0.3)',

  // Overlays
  overlay: 'rgba(139, 92, 246, 0.15)',      // Soft purple overlay
  overlayDark: 'rgba(139, 92, 246, 0.3)',

  // Text colors
  text: {
    primary: '#2D3748',      // Dark gray (not black for softer look)
    secondary: '#718096',    // Medium gray
    tertiary: '#A0AEC0',     // Light gray
    onPrimary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onError: '#FFFFFF',
    onAccent: '#FFFFFF',
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
  borderRadius: 20,       // More rounded for dreamy feel
  borderRadiusLarge: 28,  // Extra rounded
  borderRadiusSmall: 12,  // Softer small radius
  borderRadiusPill: 999,  // Full pill shape
  buttonHeight: 60,
  minTouchTarget: 44,
  maxContentWidth: 600,
};

// Soft Glows & Dreamy Shadows
export const SHADOWS = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
  },
  soft: {
    elevation: 3,
    shadowColor: '#B794F6',  // Soft lavender glow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  medium: {
    elevation: 6,
    shadowColor: '#9F7AEA',  // Medium purple glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  dreamy: {
    elevation: 10,
    shadowColor: '#B794F6',  // Lavender glow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  success: {
    elevation: 6,
    shadowColor: '#68D391',  // Green glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  error: {
    elevation: 6,
    shadowColor: '#FC8181',  // Red glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
};

// Animation Timings (for future use with Animated API)
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  springConfig: {
    damping: 15,
    mass: 1,
    stiffness: 150,
  },
};

// Opacity values for states
export const OPACITY = {
  disabled: 0.38,
  inactive: 0.54,
  active: 1.0,
  pressed: 0.7,
};
