import { useState, useCallback } from 'react';
import { GameMode, QuizQuestion, ScoreEntry, QuizResult } from '../types';
import { generateQuizQuestion } from '../utils/quizGenerator';
import { StorageService } from '../services/storage';

/**
 * Custom hook to manage quiz game state and logic
 */
export const useQuizGame = (mode: GameMode) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [usedCelebrityIds, setUsedCelebrityIds] = useState<string[]>([]);

  /**
   * Start a new game
   * Resets score and generates the first question
   */
  const startGame = useCallback(() => {
    try {
      const question = generateQuizQuestion(mode, []);
      setCurrentQuestion(question);
      setScore(0);
      setIsGameActive(true);
      setUsedCelebrityIds([question.correctAnswer.id]);
    } catch (error) {
      console.error('Error starting game:', error);
      setCurrentQuestion(null);
      setIsGameActive(false);
    }
  }, [mode]);

  /**
   * Handle user's answer selection
   * Returns result indicating if correct, game over, and score entry if game ended
   */
  const handleAnswer = useCallback(
    async (selectedId: string): Promise<QuizResult> => {
      if (!currentQuestion || !isGameActive) {
        return { correct: false, gameOver: false };
      }

      const correct = selectedId === currentQuestion.correctAnswer.id;

      if (correct) {
        // Correct answer: increment score and generate next question
        const newScore = score + 1;
        setScore(newScore);

        try {
          const nextQuestion = generateQuizQuestion(mode, usedCelebrityIds);
          setCurrentQuestion(nextQuestion);

          // Track used celebrities, but reset if we've used most of them
          setUsedCelebrityIds(prev => {
            const updated = [...prev, nextQuestion.correctAnswer.id];
            // Keep only last 15 IDs to prevent pool from becoming too small
            return updated.slice(-15);
          });

          return { correct: true, gameOver: false };
        } catch (error) {
          console.error('Error generating next question:', error);
          setIsGameActive(false);
          return { correct: true, gameOver: true };
        }
      } else {
        // Wrong answer: end game and save score
        setIsGameActive(false);

        const scoreEntry: ScoreEntry = {
          id: Date.now().toString(),
          score,
          mode,
          dateTime: new Date().toISOString(),
        };

        try {
          await StorageService.saveScore(scoreEntry);
        } catch (error) {
          console.error('Error saving score:', error);
          // Continue even if save fails - user can still see their score
        }

        return { correct: false, gameOver: true, scoreEntry };
      }
    },
    [currentQuestion, isGameActive, score, mode, usedCelebrityIds]
  );

  return {
    currentQuestion,
    score,
    isGameActive,
    startGame,
    handleAnswer,
  };
};
