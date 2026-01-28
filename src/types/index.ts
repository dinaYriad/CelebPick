export type GameMode = 'nameToFace' | 'faceToName';

export type Gender = 'male' | 'female';

export interface Celebrity {
  id: string;
  name: string;
  imageUrl: string; // Can be require() path or URI
  gender?: Gender; // Gender for filtering and quiz customization
}

export interface QuizQuestion {
  id: string;
  mode: GameMode;
  correctAnswer: Celebrity;
  options: Celebrity[]; // Array of 4 celebrities
}

export interface ScoreEntry {
  id: string;
  score: number;
  mode: GameMode;
  dateTime: string; // ISO 8601 format
}

export interface QuizState {
  currentQuestion: QuizQuestion | null;
  score: number;
  isGameActive: boolean;
}

export interface QuizResult {
  correct: boolean;
  gameOver: boolean;
  scoreEntry?: ScoreEntry;
}
