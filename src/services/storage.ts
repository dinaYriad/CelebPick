import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScoreEntry } from '../types';

const STORAGE_KEYS = {
  SCORE_HISTORY: '@celebpick_score_history',
};

export const StorageService = {
  /**
   * Save a new score entry to storage
   * Prepends the new entry to maintain newest-first order
   */
  async saveScore(entry: ScoreEntry): Promise<void> {
    try {
      const existing = await this.getScoreHistory();
      const updated = [entry, ...existing];
      await AsyncStorage.setItem(
        STORAGE_KEYS.SCORE_HISTORY,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error('Error saving score:', error);
      throw error;
    }
  },

  /**
   * Retrieve all score entries from storage
   * Returns an empty array if no scores exist or on error
   */
  async getScoreHistory(): Promise<ScoreEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SCORE_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading score history:', error);
      return [];
    }
  },

  /**
   * Clear all score history (useful for testing or reset functionality)
   */
  async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SCORE_HISTORY);
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  },
};
