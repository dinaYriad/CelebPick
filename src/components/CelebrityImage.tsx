import React, { useState } from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from 'react-native';
import { COLORS, LAYOUT } from '../constants/theme';

type ImageSize = 'small' | 'medium' | 'large';

interface CelebrityImageProps {
  source: string;
  style?: StyleProp<ImageStyle>;
  size?: ImageSize;
}

const SIZE_MAP: Record<ImageSize, { width: number; height: number }> = {
  small: { width: 80, height: 80 },
  medium: LAYOUT.optionImageSize,
  large: LAYOUT.promptImageSize,
};

/**
 * Celebrity Image component with loading state
 * Displays images with consistent sizing and loading indicators
 */
export const CelebrityImage: React.FC<CelebrityImageProps> = ({
  source,
  style,
  size = 'medium',
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dimensions = SIZE_MAP[size];

  return (
    <View style={[styles.container, dimensions, style]}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      <Image
        source={{ uri: source }}
        style={[styles.image, dimensions]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
      {error && (
        <View style={styles.errorContainer}>
          <View style={styles.errorPlaceholder} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: LAYOUT.borderRadius,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  image: {
    borderRadius: LAYOUT.borderRadius,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  errorPlaceholder: {
    width: '50%',
    height: '50%',
    backgroundColor: COLORS.text.secondary,
    opacity: 0.3,
    borderRadius: LAYOUT.borderRadius,
  },
});
