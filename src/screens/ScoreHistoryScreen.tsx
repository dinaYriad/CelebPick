import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ScoreEntry } from '../types';
import { StorageService } from '../services/storage';
import { ScoreHistoryItem } from '../components/ScoreHistoryItem';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ScoreHistory'>;

export default function ScoreHistoryScreen({ route, navigation }: Props) {
  const { latestScoreId } = route.params || {};
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const history = await StorageService.getScoreHistory();
      setScores(history);
    } catch (error) {
      console.error('Error loading scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const latestScore = latestScoreId
    ? scores.find(s => s.id === latestScoreId)
    : null;

  const getModeLabel = (mode: string): string => {
    return mode === 'nameToFace' ? 'Name → Face' : 'Face → Name';
  };

  const formatDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (scores.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No scores yet!</Text>
          <Text style={styles.emptySubtext}>
            Play a quiz to start building your history.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Start Playing</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Latest Score Header */}
        {latestScore && (
          <View style={styles.latestScoreHeader}>
            <Text style={styles.headerTitle}>Latest Score</Text>
            <View style={styles.latestScoreContent}>
              <Text style={styles.latestScoreValue}>{latestScore.score}</Text>
              <View style={styles.latestScoreDetails}>
                <Text style={styles.latestScoreMode}>
                  {getModeLabel(latestScore.mode)}
                </Text>
                <Text style={styles.latestScoreDate}>
                  {formatDate(latestScore.dateTime)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Score History List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Score History</Text>
          <FlatList
            data={scores}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ScoreHistoryItem
                score={item}
                isHighlighted={item.id === latestScoreId}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    ...TYPOGRAPHY.heading,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  latestScoreHeader: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.onPrimary,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
    opacity: 0.9,
  },
  latestScoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  latestScoreValue: {
    ...TYPOGRAPHY.title,
    fontSize: 48,
    color: COLORS.text.onPrimary,
    fontWeight: 'bold',
    marginRight: SPACING.md,
  },
  latestScoreDetails: {
    flex: 1,
  },
  latestScoreMode: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.onPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  latestScoreDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.onPrimary,
    opacity: 0.9,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingBottom: SPACING.md,
  },
  buttonContainer: {
    marginTop: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.onPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 12,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
