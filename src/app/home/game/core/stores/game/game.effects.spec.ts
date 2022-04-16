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
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('GameEffects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        GameEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GameEffects);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load words and start on navigation when no words', () => {
    store.overrideSelector(fromWord.getWords, []);
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

  it('should not load words and start on navigation when words', () => {
    store.overrideSelector(fromWord.getWords, ['word']);
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
    const expected = cold('-a-', {
      a: GameActions.start(),
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
  });

  describe('on loosing or winning', () => {
    let spyOnNavigate: jasmine.Spy;
    const charOrWord = 'x';

    beforeEach(() => {
      spyOnNavigate = spyOn(router, 'navigate');
    });

    it('should navigate to game over on loose', () => {
      store.overrideSelector(fromGame.getLoose, true);

      const a = GameActions.guessFailure({ charOrWord });
      actions$ = hot('-a-', {
        a,
      });
      const expected = cold('-a-', {
        a: [a, true],
      });

      expect(effects.loose$).toBeObservable(expected);
      expect(spyOnNavigate).toHaveBeenCalledWith(['game', 'over']);
    });

    it('should navigate to win on winning', () => {
      store.overrideSelector(fromGame.getWin, true);

      const a = GameActions.guessSuccess({ charOrWord });
      actions$ = hot('-a-', {
        a,
      });
      const expected = cold('-a-', {
        a: [a, true],
      });

      expect(effects.win$).toBeObservable(expected);
      expect(spyOnNavigate).toHaveBeenCalledWith(['game', 'win']);
    });
  });
});
