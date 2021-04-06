import { createAction, props } from '@ngrx/store';

export const setWord = createAction(
  '[Game] Set word',
  props<{ word: string }>()
);

export const start = createAction('[Game] Start');

export const tryChar = createAction(
  '[Game] Try a char',
  props<{ char: string }>()
);
export const tryCharSuccess = createAction(
  '[Game] Try a char success',
  props<{ char: string }>()
);
export const tryCharFailure = createAction(
  '[Game] Try a char failure',
  props<{ char: string }>()
);
