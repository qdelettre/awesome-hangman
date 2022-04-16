import * as fromWord from './word.reducer';
import {
  getRequestState,
  getWord,
  getWords,
  selectWordState,
} from './word.selectors';

describe('Word Selectors', () => {
  const initialState = { ...fromWord.initialState };

  it('should select the feature state', () => {
    const result = selectWordState.projector({
      ...initialState,
    });

    expect(result).toEqual(initialState);
  });

  it('should select the request state', () => {
    const result = getRequestState.projector({ ...initialState });

    expect(result).toEqual(initialState.requestState);
  });

  it('should select get words', () => {
    const result = getWords.projector({ ...initialState });

    expect(result).toEqual(initialState.words);
  });

  it('should get word when words', () => {
    const word = 'word';
    const result = getWord.projector([word], { random: 0 });

    expect(result).toEqual(word);
  });

  it('should return null when words empty', () => {
    const result = getWord.projector([], { random: 0 });

    expect(result).toEqual(null);
  });
});
