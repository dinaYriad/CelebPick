import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CelebrityImage } from './CelebrityImage';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT, SHADOWS, OPACITY } from '../constants/theme';

interface QuizOptionProps {
  type: 'image' | 'text';
  content: string; // Image URL for image type, name for text type
  onPress: () => void;
  disabled?: boolean;
  feedbackState?: 'idle' | 'correct' | 'wrong' | 'correct-answer';
}

/**
 * Dreamy quiz option button for both game modes
 * Renders either an image or text button with soft glows and rounded shapes
 * Supports visual feedback states for correct/wrong answers
 */
export const QuizOption: React.FC<QuizOptionProps> = ({
  type,
  content,
  onPress,
  disabled = false,
  feedbackState = 'idle',
}) => {
  // Get styling based on feedback state
  const getShadowStyle = () => {
    switch (feedbackState) {
      case 'correct':
        return SHADOWS.success;
      case 'wrong':
        return SHADOWS.error;
      case 'correct-answer':
        return SHADOWS.success;
      default:
        return SHADOWS.soft;
    }
  };

  const getBorderStyle = () => {
    switch (feedbackState) {
      case 'correct':
        return { borderColor: COLORS.success, borderWidth: 4 };
      case 'wrong':
        return { borderColor: COLORS.error, borderWidth: 4 };
      case 'correct-answer':
        return { borderColor: COLORS.successLight, borderWidth: 4 };
      default:
        return { borderColor: COLORS.cardBorder, borderWidth: 2 };
    }
  };

  const getGradientColors = () => {
    switch (feedbackState) {
      case 'correct':
        return [COLORS.success, COLORS.success];
      case 'wrong':
        return [COLORS.error, COLORS.error];
      case 'correct-answer':
        return [COLORS.successLight, COLORS.success];
      default:
        return [COLORS.primary, COLORS.primaryDark];
    }
  };

  if (type === 'image') {
    return (
      <TouchableOpacity
        style={[styles.imageOption, getBorderStyle(), getShadowStyle()]}
        onPress={onPress}
        disabled={disabled || feedbackState !== 'idle'}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <CelebrityImage source={content} size="medium" />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.textOptionContainer, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || feedbackState !== 'idle'}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.textOption, getBorderStyle(), getShadowStyle()]}
      >
        <Text style={styles.textOptionLabel} numberOfLines={2}>
          {content}
        </Text>
        {feedbackState === 'correct' && <Text style={styles.feedbackIcon}>✨</Text>}
        {feedbackState === 'wrong' && <Text style={styles.feedbackIcon}>✗</Text>}
        {feedbackState === 'correct-answer' && <Text style={styles.feedbackIcon}>✓</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageOption: {
    margin: SPACING.sm,
    borderRadius: LAYOUT.borderRadius,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  imageWrapper: {
    borderRadius: LAYOUT.borderRadius,
    overflow: 'hidden',
  },
  textOptionContainer: {
    marginVertical: SPACING.sm,
  },
  textOption: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: LAYOUT.borderRadiusPill,
    minHeight: LAYOUT.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textOptionLabel: {
    fontSize: 18,
    color: COLORS.text.onPrimary,
    textAlign: 'center',
    fontWeight: '600',
    flex: 1,
  },
  feedbackIcon: {
    fontSize: 20,
    marginLeft: SPACING.sm,
    color: COLORS.text.onPrimary,
  },
  disabled: {
    opacity: OPACITY.disabled,
  },
});
