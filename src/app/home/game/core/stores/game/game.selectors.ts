import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';

const selectGameState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);

export const getWord = createSelector(selectGameState, ({ word }) => word);

const getGuess = createSelector(selectGameState, ({ guess }) => guess);

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

export const getGuessChars = createSelector(
  getGuessSorted,
  ({ chars }) => chars
);
export const getGuessWords = createSelector(
  getGuessSorted,
  ({ words }) => words
);

const r = new RegExp('[^a-zA-Z]');
export const getWordChars = createSelector(
  getWord,
  getGuessSorted,
  (word, { chars, words }) => {
    if (!word || word.length === 0) {
      return [];
    } else if (
      words.filter((w) => w.toLowerCase() === word.toLowerCase()).length === 1
    ) {
      return [...word];
    } else {
      return [...word].map((char) =>
        chars.includes(char.toLowerCase()) || r.test(char) ? char : ''
      );
    }
  }
);

const getRules = createSelector(selectGameState, ({ rules }) => rules);
const getMaxAttempts = createSelector(
  getRules,
  ({ maxAttempts }) => maxAttempts
);
const getAttempts = createSelector(getGuess, (guess) => guess.length);

export const getMaxAttemptsReached = createSelector(
  getMaxAttempts,
  getAttempts,
  (maxAttempts, attempts) => attempts >= maxAttempts
);

export const getWin = createSelector(
  getWord,
  getGuessWords,
  getGuessChars,
  (word, words, chars) =>
    !!word &&
    (words.filter((w) => w.toLowerCase() === word.toLowerCase()).length === 1 ||
      word.toLowerCase() === chars.join(''))
);

export const getLoose = createSelector(
  getWin,
  getMaxAttemptsReached,
  (win, maxAttemptsReached) => !win && maxAttemptsReached
);
