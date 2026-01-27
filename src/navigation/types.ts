import { GameMode } from '../types';

/**
 * Root stack navigator parameter list
 * Defines the screens and their required parameters
 */
export type RootStackParamList = {
  Home: undefined;
  Quiz: {
    mode: GameMode;
  };
  ScoreHistory: {
    latestScoreId?: string;
  };
};
