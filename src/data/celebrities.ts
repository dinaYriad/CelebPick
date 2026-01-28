import { Celebrity, Gender } from '../types';
import celebritiesData from '../../data/celebrities.json';

/**
 * Celebrity dataset imported from Wikidata
 * Images are from Wikimedia Commons
 *
 * To regenerate: node scripts/fetchCelebs.mjs
 */
export const CELEBRITIES: Celebrity[] = celebritiesData.map(celeb => ({
  id: celeb.id,
  name: celeb.name,
  imageUrl: celeb.imageUrl,
  ...(celeb.gender && { gender: celeb.gender }),
}));

/**
 * Get a celebrity by ID
 */
export const getCelebrityById = (id: string): Celebrity | undefined => {
  return CELEBRITIES.find(c => c.id === id);
};

/**
 * Get random celebrities, optionally excluding certain IDs
 */
export const getRandomCelebrities = (
  count: number,
  exclude: string[] = []
): Celebrity[] => {
  const available = CELEBRITIES.filter(c => !exclude.includes(c.id));

  // Shuffle and return the requested count
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Get random celebrities filtered by gender
 * Note: Only returns celebrities that have the gender field populated with the specified value.
 * Celebrities without gender data will not be included in the results.
 */
export const getRandomCelebritiesByGender = (
  count: number,
  gender: Gender,
  exclude: string[] = []
): Celebrity[] => {
  const available = CELEBRITIES.filter(
    c => !exclude.includes(c.id) && c.gender === gender
  );

  // Shuffle and return the requested count
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
