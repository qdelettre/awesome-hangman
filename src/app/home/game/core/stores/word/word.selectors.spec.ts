import * as fromWord from './word.reducer';
import {
  getRequestState,
  getWord,
  getWords,
  selectWordState,
} from './word.selectors';

describe('Word Selectors', () => {
  it('should select the feature state', () => {
    const result = selectWordState({
      [fromWord.wordFeatureKey]: fromWord.initialState,
    });

    expect(result).toEqual(fromWord.initialState);
  });

  it('should select the request state', () => {
    const result = getRequestState({
      [fromWord.wordFeatureKey]: fromWord.initialState,
    });

    expect(result).toEqual(fromWord.initialState.requestState);
  });

  it('should select get words', () => {
    const result = getWords({
      [fromWord.wordFeatureKey]: fromWord.initialState,
    });

    expect(result).toEqual(fromWord.initialState.words);
  });

  it('should get word when words', () => {
    const word = 'word';
    const result = getWord(
      {
        [fromWord.wordFeatureKey]: { ...fromWord.initialState, words: [word] },
      },
      { random: 0 }
    );

    expect(result).toEqual(word);
  });

  it('should return null when words empty', () => {
    const result = getWord(
      {
        [fromWord.wordFeatureKey]: { ...fromWord.initialState, words: [] },
      },
      { random: 0 }
    );

    expect(result).toEqual(null);
  });
});
