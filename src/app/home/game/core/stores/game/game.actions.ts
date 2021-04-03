import { createAction, props } from '@ngrx/store';

export const setWord = createAction(
  '[Game] Set word',
  props<{ word: string }>()
);

export const start = createAction('[Game] Start');
