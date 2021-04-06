import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as GameActions from './game.actions';
import * as WordActions from '../word/word.actions';

import { GameEffects } from './game.effects';
import * as fromWord from '../word/word.selectors';
import * as fromGame from './game.selectors';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

describe('GameEffects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let store: MockStore;
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
    mockWordSelector = store.overrideSelector(fromWord.getWord, null);

    actions$ = hot('-a-', {
      a: GameActions.start,
    });
    const expected = cold('---');
    expect(effects.start$).toBeObservable(expected);
  });

  it('should set word on start', () => {
    mockWordSelector = store.overrideSelector(fromWord.getWord, 'word');

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

  describe('when word', () => {
    beforeEach(() => {
      mockWordSelector = store.overrideSelector(fromGame.getWord, 'word');
    });

    it('should emit tryCharSuccess on try char when char in word', () => {
      const char = 'W';
      actions$ = hot('-a-', {
        a: GameActions.tryChar({ char }),
      });
      const expected = cold('-a-', {
        a: GameActions.tryCharSuccess({
          char,
        }),
      });
      expect(effects.tryAchar$).toBeObservable(expected);
    });

    it('should emit tryCharFailure on try char when char not in word', () => {
      const char = 'x';
      actions$ = hot('-a-', {
        a: GameActions.tryChar({ char }),
      });
      const expected = cold('-a-', {
        a: GameActions.tryCharFailure({
          char,
        }),
      });
      expect(effects.tryAchar$).toBeObservable(expected);
    });
  });
});
