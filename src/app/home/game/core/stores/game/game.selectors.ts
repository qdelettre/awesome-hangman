import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';

const selectGameState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);

export const getWord = createSelector(selectGameState, ({ word }) => word);

export const getGuess = createSelector(selectGameState, ({ guess }) => guess);

export const getGuessSorted = createSelector(getGuess, (guess) =>
  guess.reduce(
    ({ chars, words }: { chars: string[]; words: string[] }, s) => ({
      chars: [...chars, ...(s.length === 1 ? [s] : [])],
      words: [...words, ...(s.length !== 1 ? [s] : [])],
    }),
    {
      chars: [],
      words: [],
    }
  )
);

const r = /[^a-zA-Z]/;
export const getWordChars = createSelector(
  getWord,
  getGuessSorted,
  (word, { chars, words }) => {
    if (!word || word.length === 0) {
      return [];
    } else if (words.some((w) => w.toLowerCase() === word.toLowerCase())) {
      return [...word];
    } else {
      return [...word].map((char) =>
        chars.includes(char.toLowerCase()) || r.test(char) ? char : null
      );
    }
  }
);

const getRules = createSelector(selectGameState, ({ rules }) => rules);
export const getMaxErrors = createSelector(
  getRules,
  ({ maxErrors }) => maxErrors
);
export const getErrors = createSelector(
  getWord,
  getGuessSorted,
  (word, { chars, words }) =>
    chars.filter((char) => !word?.toLowerCase().includes(char)).length +
    words.filter((w) => w.toLowerCase() !== word?.toLowerCase()).length
);

export const getMaxErrorsReached = createSelector(
  getMaxErrors,
  getErrors,
  (maxErrors, errors) => errors >= maxErrors
);

export const getWin = createSelector(
  getWord,
  getGuessSorted,
  (word, { words, chars }) =>
    !!word &&
    (words.some((w) => w.toLowerCase() === word.toLowerCase()) ||
      word.split(/[^a-zA-Z]?/g).every((w) => chars.includes(w.toLowerCase())))
);

export const getLoose = createSelector(
  getWin,
  getMaxErrorsReached,
  (win, maxErrorsReached) => !win && maxErrorsReached
);
