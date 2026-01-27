import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

type GradientType = 'primary' | 'secondary' | 'accent' | 'warm';

interface GradientBackgroundProps {
  type?: GradientType;
  children: React.ReactNode;
}

/**
 * Dreamy gradient background wrapper
 * Provides soft pastel gradient backgrounds for screens
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  type = 'primary',
  children,
}) => {
  const gradientColors = COLORS.gradients[type];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
