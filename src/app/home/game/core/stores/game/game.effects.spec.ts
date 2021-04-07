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
    store.overrideSelector(fromWord.getWord, null);

    actions$ = hot('-a-', {
      a: GameActions.start,
    });
    const expected = cold('---');
    expect(effects.start$).toBeObservable(expected);
  });

  it('should set word on start', () => {
    store.overrideSelector(fromWord.getWord, 'word');

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
      store.overrideSelector(fromGame.getWord, 'word');
    });

    it('should emit guessSuccess on guess when char in word', () => {
      const charOrWord = 'W';
      actions$ = hot('-a-', {
        a: GameActions.guess({ charOrWord }),
      });
      const expected = cold('-a-', {
        a: GameActions.guessSuccess({
          charOrWord,
        }),
      });
      expect(effects.guess$).toBeObservable(expected);
    });

    it('should emit guessFailure on guess when char not in word', () => {
      const charOrWord = 'x';
      actions$ = hot('-a-', {
        a: GameActions.guess({ charOrWord }),
      });
      const expected = cold('-a-', {
        a: GameActions.guessFailure({
          charOrWord,
        }),
      });
      expect(effects.guess$).toBeObservable(expected);
    });

    it('should emit loose on guessFailure when loosing', () => {
      store.overrideSelector(fromGame.getLoose, true);

      const charOrWord = 'x';
      actions$ = hot('-a-', {
        a: GameActions.guessFailure({ charOrWord }),
      });
      const expected = cold('-a-', {
        a: GameActions.loose(),
      });
      expect(effects.loose$).toBeObservable(expected);
    });

    it('should emit win on guessFailure when winning', () => {
      store.overrideSelector(fromGame.getWin, true);

      const charOrWord = 'W';
      actions$ = hot('-a-', {
        a: GameActions.guessSuccess({ charOrWord }),
      });
      const expected = cold('-a-', {
        a: GameActions.win(),
      });
      expect(effects.win$).toBeObservable(expected);
    });
  });
});
