import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useQuizGame } from '../hooks/useQuizGame';
import { QuizOption } from '../components/QuizOption';
import { CelebrityImage } from '../components/CelebrityImage';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ route, navigation }: Props) {
  const { mode } = route.params;
  const { currentQuestion, score, startGame, handleAnswer } = useQuizGame(mode);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const onOptionPress = async (selectedId: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    const result = await handleAnswer(selectedId);

    if (result.gameOver) {
      // Navigate to Score History with latest score ID
      navigation.replace('ScoreHistory', {
        latestScoreId: result.scoreEntry?.id,
      });
    } else {
      // Correct answer - next question will load automatically
      setIsProcessing(false);
    }
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isNameToFace = mode === 'nameToFace';

  return (
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
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
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
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  scoreLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    marginRight: SPACING.xs,
  },
  scoreValue: {
    ...TYPOGRAPHY.heading,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  promptContainer: {
    marginBottom: SPACING.xl,
  },
  promptLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  namePromptContainer: {
    alignItems: 'center',
  },
  celebrityName: {
    ...TYPOGRAPHY.title,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  imagePromptContainer: {
    alignItems: 'center',
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
