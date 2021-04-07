import { createAction, props } from '@ngrx/store';

export const setWord = createAction(
  '[Game] Set word',
  props<{ word: string }>()
);

export const start = createAction('[Game] Start');

export const guess = createAction(
  '[Game] Guess',
  props<{ charOrWord: string }>()
);
export const guessSuccess = createAction(
  '[Game] Guess success',
  props<{ charOrWord: string }>()
);
export const guessFailure = createAction(
  '[Game] Guess failure',
  props<{ charOrWord: string }>()
);

export const win = createAction('[Game] Win');
export const loose = createAction('[Game] Loose');
