import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWord from './word.reducer';

export const selectWordState = createFeatureSelector<fromWord.State>(
  fromWord.wordFeatureKey
);

export const getRequestState = createSelector(
  selectWordState,
  (state) => state.requestState
);

export const getWords = createSelector(selectWordState, (state) => state.words);

export const getWord = createSelector(
  getWords,
  (words: string[], { random }: { random: number }) =>
    words.length ? words[Math.floor(random * words.length)] : null
);
