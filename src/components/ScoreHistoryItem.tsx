import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScoreEntry } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

interface ScoreHistoryItemProps {
  score: ScoreEntry;
  isHighlighted?: boolean;
}

/**
 * Individual score entry component for the history list
 * Displays score, mode, and date with highlighting for latest entry
 */
export const ScoreHistoryItem: React.FC<ScoreHistoryItemProps> = ({
  score,
  isHighlighted = false,
}) => {
  const formatDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getModeLabel = (mode: string): string => {
    return mode === 'nameToFace' ? 'Name → Face' : 'Face → Name';
  };

  return (
    <View
      style={[
        styles.container,
        isHighlighted && styles.highlightedContainer,
      ]}
    >
      <View style={styles.leftSection}>
        <Text style={styles.scoreValue}>{score.score}</Text>
        <Text style={styles.scoreLabel}>points</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.modeContainer}>
          <Text style={styles.modeText}>{getModeLabel(score.mode)}</Text>
          {isHighlighted && (
            <View style={styles.latestBadge}>
              <Text style={styles.latestBadgeText}>LATEST</Text>
            </View>
          )}
        </View>
        <Text style={styles.dateText}>{formatDate(score.dateTime)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surface,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  highlightedContainer: {
    backgroundColor: COLORS.highlight,
    borderColor: COLORS.highlightBorder,
    borderWidth: 2,
    elevation: 3,
    shadowOpacity: 0.2,
  },
  leftSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    minWidth: 60,
  },
  scoreValue: {
    ...TYPOGRAPHY.title,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  scoreLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  modeText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
    fontWeight: '600',
  },
  latestBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: SPACING.sm,
  },
  latestBadgeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.onPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
  },
});
