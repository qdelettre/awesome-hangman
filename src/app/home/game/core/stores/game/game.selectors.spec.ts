import * as fromGame from './game.reducer';
import {
  getGuessChars,
  getGuessSorted,
  getGuessWords,
  getLoose,
  getMaxAttemptsReached,
  getWin,
  getWord,
  getWordChars,
} from './game.selectors';

describe('Game Selectors', () => {
  const word = 'word';
  const words = [word];
  const char = 'w';
  const chars = [char];

  it('should select the word', () => {
    const result = getWord({
      [fromGame.gameFeatureKey]: { ...fromGame.initialState, word },
    });

    expect(result).toEqual(word);
  });

  describe('sorted guess', () => {
    const mockState = {
      [fromGame.gameFeatureKey]: {
        ...fromGame.initialState,
        guess: [char, word],
      },
    };

    it('should select the GuessSorted', () => {
      const result = getGuessSorted(mockState);

      expect(result).toEqual({
        chars,
        words,
      });
    });
    it('should select the chars', () => {
      const result = getGuessChars(mockState);

      expect(result).toEqual(chars);
    });
    it('should select the words', () => {
      const result = getGuessWords(mockState);

      expect(result).toEqual(words);
    });
  });

  describe('MaxAttemptsReached', () => {
    const guess = [char, word];
    it('should select false when reached', () => {
      const result = getMaxAttemptsReached({
        [fromGame.gameFeatureKey]: {
          ...fromGame.initialState,
          guess,
          rules: { maxAttempts: 10 },
        },
      });

      expect(result).toEqual(false);
    });

    it('should select true when reached', () => {
      const result = getMaxAttemptsReached({
        [fromGame.gameFeatureKey]: {
          ...fromGame.initialState,
          guess,
          rules: { maxAttempts: 1 },
        },
      });
      expect(result).toEqual(true);
    });
  });

  describe('word chars', () => {
    it('should return the word when word is in guess', () => {
      const result = getWordChars({
        [fromGame.gameFeatureKey]: {
          ...fromGame.initialState,
          word,
          guess: [word],
        },
      });

      expect(result).toEqual([...word]);
    });

    it('should return the word when word is in guess', () => {
      const result = getWordChars({
        [fromGame.gameFeatureKey]: {
          ...fromGame.initialState,
          word,
          guess: [...word],
        },
      });

      expect(result).toEqual([...word]);
    });

    it('should return empty array when word is empty', () => {
      const result = getWordChars({
        [fromGame.gameFeatureKey]: {
          ...fromGame.initialState,
        },
      });

      expect(result).toEqual([]);
    });
  });

  it('should return true when win', () => {
    const result = getWin({
      [fromGame.gameFeatureKey]: {
        ...fromGame.initialState,
        word,
        guess: [word],
      },
    });

    expect(result).toEqual(true);
  });

  it('should return false when not win', () => {
    const result = getWin({
      [fromGame.gameFeatureKey]: {
        ...fromGame.initialState,
        word,
        guess: [char],
      },
    });

    expect(result).toEqual(false);
  });

  it('should return true when loose', () => {
    const result = getLoose({
      [fromGame.gameFeatureKey]: {
        ...fromGame.initialState,
        rules: { maxAttempts: 1 },
        word,
        guess: [char],
      },
    });

    expect(result).toEqual(true);
  });

  it('should return false when not loose', () => {
    const result = getLoose({
      [fromGame.gameFeatureKey]: {
        ...fromGame.initialState,
        rules: { maxAttempts: 2 },
        word,
        guess: [char],
      },
    });

    expect(result).toEqual(false);
  });
});
