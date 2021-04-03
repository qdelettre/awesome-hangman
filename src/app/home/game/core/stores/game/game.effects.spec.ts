import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as fromWord from '../word/word.reducer';
import * as GameActions from './game.actions';
import * as WordActions from '../word/word.actions';

import { GameEffects } from './game.effects';
import { getWord } from '../word/word.selectors';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

describe('GameEffects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let store: MockStore<fromWord.State>;
  let mockWordSelector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GameEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load words and start on navigation', () => {
    const routerNavigationAction = {
      type: ROUTER_NAVIGATION,
      payload: {
        routerState: {
          url: '/game',
        },
      },
    };

    actions$ = hot('-a-', {
      a: routerNavigationAction,
    });
    const expected = cold('-(ab)-', {
      a: WordActions.loadWords(),
      b: GameActions.start(),
    });
    expect(effects.navigation$).toBeObservable(expected);
  });

  it('should not set word on start', () => {
    mockWordSelector = store.overrideSelector(getWord, null);

    actions$ = hot('-a-', {
      a: GameActions.start,
    });
    const expected = cold('---');
    expect(effects.start$).toBeObservable(expected);
  });

  it('should set word on start', () => {
    mockWordSelector = store.overrideSelector(getWord, 'word');

    actions$ = hot('-a-', {
      a: GameActions.start,
    });
    const expected = cold('-a-', {
      a: GameActions.setWord({
        word: 'word',
      }),
    });
    expect(effects.start$).toBeObservable(expected);
  });
});
