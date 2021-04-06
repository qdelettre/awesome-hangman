import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

import {
  concatMap,
  filter,
  first,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import * as WordActions from '../word/word.actions';
import * as GameActions from '../game/game.actions';
import * as fromWord from '../word/word.selectors';
import * as fromGame from './game.selectors';

import { Store } from '@ngrx/store';

@Injectable()
export class GameEffects {
  navigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      filter(({ payload }) => payload.routerState.url === '/game'),
      concatMap(() => [WordActions.loadWords(), GameActions.start()])
    )
  );

  start$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.start),
      switchMap(() =>
        this.store.select(fromWord.getWord, { random: Math.random() }).pipe(
          filter((word): word is string => !!word && word.length !== 0),
          first()
        )
      ),
      concatMap((word) => [GameActions.setWord({ word })])
    )
  );

  tryAchar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.tryChar),
      map(({ char }) => char),
      withLatestFrom(
        this.store
          .select(fromGame.getWord)
          .pipe(filter((word): word is string => !!word))
      ),
      concatMap(([char, word]) => [
        word.toLowerCase().includes(char.toLowerCase())
          ? GameActions.tryCharSuccess({ char })
          : GameActions.tryCharFailure({ char }),
      ])
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
