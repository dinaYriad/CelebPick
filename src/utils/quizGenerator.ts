import { Celebrity, QuizQuestion, GameMode } from '../types';
import { shuffleArray, getRandomElement } from './randomizer';
import { CELEBRITIES } from '../data/celebrities';

/**
 * Generate a unique ID for each question
 */
const generateQuestionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate a quiz question with 4 options (1 correct + 3 wrong)
 * Prevents immediate repetition by tracking recently used celebrity IDs
 */
export const generateQuizQuestion = (
  mode: GameMode,
  usedCelebrityIds: string[] = []
): QuizQuestion => {
  // Filter out recently used celebrities
  const available = CELEBRITIES.filter(c => !usedCelebrityIds.includes(c.id));

  // If we've used most celebrities, reset the pool
  // Keep at least 4 available for question generation
  const pool = available.length >= 4 ? available : CELEBRITIES;

  if (pool.length < 4) {
    throw new Error('Not enough celebrities in the dataset. Need at least 4.');
  }

  // Select the correct answer
  const correctAnswer = getRandomElement(pool);

  // Select 3 wrong answers (excluding the correct one)
  const wrongAnswers = pool
    .filter(c => c.id !== correctAnswer.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Combine and shuffle all options
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);

  return {
    id: generateQuestionId(),
    mode,
    correctAnswer,
    options,
  };
};
