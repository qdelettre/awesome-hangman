import * as fromGame from './game.reducer';
import {
  getErrors,
  getGuessSorted,
  getLoose,
  getMaxErrorsReached,
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
    const result = getWord.projector({ ...fromGame.initialState, word });

    expect(result).toEqual(word);
  });

  describe('sorted guess', () => {
    it('should select the GuessSorted', () => {
      const result = getGuessSorted.projector([char, word]);

      expect(result).toEqual({
        chars,
        words,
      });
    });
  });

  describe('maxErrorsReached', () => {
    it('should select false when not reached', () => {
      const result = getMaxErrorsReached.projector(1, 0);

      expect(result).toEqual(false);
    });

    it('should select true when reached', () => {
      const result = getMaxErrorsReached.projector(1, 2);

      expect(result).toEqual(true);
    });
  });

  describe('word chars', () => {
    it('should return the word when word is in guess', () => {
      const result = getWordChars.projector(word, { chars: [], words: [word] });

      expect(result).toEqual([...word]);
    });

    it('should return the word when word is in guess as chars', () => {
      const result = getWordChars.projector(word, {
        chars: [...word],
        words: [],
      });

      expect(result).toEqual([...word]);
    });

    it('should return empty array when word is empty', () => {
      const result = getWordChars.projector(fromGame.initialState.word, {
        chars: [],
        words: [],
      });

      expect(result).toEqual([]);
    });
  });

  it('should return true when win', () => {
    const result = getWin.projector(word, {
      chars: [],
      words: [word],
    });

    expect(result).toEqual(true);
  });

  it('should return false when not win', () => {
    const result = getWin.projector(word, {
      chars: [char],
      words: [],
    });

    expect(result).toEqual(false);
  });

  it('should return true when max error reached', () => {
    const result = getLoose.projector(false, true);

    expect(result).toEqual(true);
  });

  it('should return false when not max error reached', () => {
    const result = getLoose.projector(false, false);

    expect(result).toEqual(false);
  });

  it('should return false when win', () => {
    const result = getLoose.projector(true, false);

    expect(result).toEqual(false);
  });

  it('should return errors', () => {
    expect(getErrors.projector(word, { chars: [], words: [] })).toEqual(0);
    expect(getErrors.projector(word, { chars: ['x'], words: [] })).toEqual(1);
    expect(getErrors.projector(null, { chars: ['x'], words: [] })).toEqual(1);
    expect(getErrors.projector(word, { chars: [], words: ['test'] })).toEqual(
      1
    );

    expect(getErrors.projector(null, { chars: [], words: ['test'] })).toEqual(
      1
    );
  });
});
