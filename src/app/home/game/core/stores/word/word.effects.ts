import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as WordActions from './word.actions';
import { WordsService } from '../../services/words/words.service';

@Injectable()
export class WordEffects {
  loadWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WordActions.loadWords),
      concatMap(() =>
        this.wordsService.get().pipe(
          map(({ values }) => WordActions.loadWordsSuccess({ words: values })),
          catchError((error) => of(WordActions.loadWordsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private wordsService: WordsService) {}
}
