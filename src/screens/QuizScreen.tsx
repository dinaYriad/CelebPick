import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { GradientBackground } from '../components/GradientBackground';
import { useQuizGame } from '../hooks/useQuizGame';
import { QuizOption } from '../components/QuizOption';
import { CelebrityImage } from '../components/CelebrityImage';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT, SHADOWS } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;
type FeedbackState = 'idle' | 'correct' | 'wrong' | 'correct-answer';

export default function QuizScreen({ route, navigation }: Props) {
  const { mode } = route.params;
  const { currentQuestion, score, startGame, handleAnswer } = useQuizGame(mode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedbackStates, setFeedbackStates] = useState<Record<string, FeedbackState>>({});

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    // Reset feedback states when question changes
    setFeedbackStates({});
    setSelectedOptionId(null);
  }, [currentQuestion?.id]);

  const onOptionPress = async (selectedId: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setSelectedOptionId(selectedId);
    const result = await handleAnswer(selectedId);

    if (result.gameOver) {
      // Show wrong answer feedback
      setFeedbackStates({
        [selectedId]: 'wrong',
        [currentQuestion!.correctAnswer.id]: 'correct-answer',
      });

      // Wait 1.5 seconds before navigating
      setTimeout(() => {
        navigation.replace('ScoreHistory', {
          latestScoreId: result.scoreEntry?.id,
        });
      }, 1500);
    } else {
      // Show correct answer feedback
      setFeedbackStates({ [selectedId]: 'correct' });

      // Wait 600ms before advancing to next question
      setTimeout(() => {
        setIsProcessing(false);
        setFeedbackStates({});
        setSelectedOptionId(null);
      }, 600);
    }
  };

  if (!currentQuestion) {
    return (
      <GradientBackground type="secondary">
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  const isNameToFace = mode === 'nameToFace';

  return (
    <GradientBackground type="secondary">
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score:</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        {/* Prompt Section */}
        <View style={styles.promptContainer}>
          {isNameToFace ? (
            // Name → Face: Show name as text
            <View style={styles.namePromptContainer}>
              <Text style={styles.promptLabel}>Who is this?</Text>
              <Text style={styles.celebrityName}>
                {currentQuestion.correctAnswer.name}
              </Text>
            </View>
          ) : (
            // Face → Name: Show image
            <View style={styles.imagePromptContainer}>
              <Text style={styles.promptLabel}>Who is this?</Text>
              <CelebrityImage
                source={currentQuestion.correctAnswer.imageUrl}
                size="large"
              />
            </View>
          )}
        </View>

        {/* Options Section */}
        <View style={styles.optionsContainer}>
          {isNameToFace ? (
            // Name → Face: Show 4 images in a grid
            <View style={styles.imageOptionsGrid}>
              {currentQuestion.options.map((celebrity) => (
                <QuizOption
                  key={celebrity.id}
                  type="image"
                  content={celebrity.imageUrl}
                  onPress={() => onOptionPress(celebrity.id)}
                  disabled={isProcessing}
                  feedbackState={feedbackStates[celebrity.id] || 'idle'}
                />
              ))}
            </View>
          ) : (
            // Face → Name: Show 4 text buttons
            <View style={styles.textOptionsContainer}>
              {currentQuestion.options.map((celebrity) => (
                <QuizOption
                  key={celebrity.id}
                  type="text"
                  content={celebrity.name}
                  onPress={() => onOptionPress(celebrity.id)}
                  disabled={isProcessing}
                  feedbackState={feedbackStates[celebrity.id] || 'idle'}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  scoreContainer: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: LAYOUT.borderRadiusPill,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.soft,
  },
  scoreLabel: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginRight: SPACING.xs,
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: '800',
  },
  promptContainer: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  promptLabel: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
    fontWeight: '500',
  },
  namePromptContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: LAYOUT.borderRadiusLarge,
    ...SHADOWS.soft,
  },
  celebrityName: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  imagePromptContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: LAYOUT.borderRadiusLarge,
    ...SHADOWS.soft,
  },
  optionsContainer: {
    flex: 1,
  },
  imageOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textOptionsContainer: {
    width: '100%',
  },
});
