import { createAction, props } from '@ngrx/store';

export const loadWords = createAction('[Word] Load Words');

export const loadWordsSuccess = createAction(
  '[Word] Load Words Success',
  props<{ words: string[] }>()
);

export const loadWordsFailure = createAction(
  '[Word] Load Words Failure',
  props<{ error: any }>()
);
