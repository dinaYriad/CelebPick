import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CelebrityImage } from './CelebrityImage';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../constants/theme';

interface QuizOptionProps {
  type: 'image' | 'text';
  content: string; // Image URL for image type, name for text type
  onPress: () => void;
  disabled?: boolean;
}

/**
 * Unified quiz option button for both game modes
 * Renders either an image or text button based on type
 */
export const QuizOption: React.FC<QuizOptionProps> = ({
  type,
  content,
  onPress,
  disabled = false,
}) => {
  if (type === 'image') {
    return (
      <TouchableOpacity
        style={styles.imageOption}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <CelebrityImage source={content} size="medium" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.textOption, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.textOptionLabel} numberOfLines={2}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageOption: {
    margin: SPACING.sm,
    borderRadius: LAYOUT.borderRadius,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textOption: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: LAYOUT.borderRadius,
    marginVertical: SPACING.sm,
    minHeight: LAYOUT.buttonHeight,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textOptionLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.onPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});
