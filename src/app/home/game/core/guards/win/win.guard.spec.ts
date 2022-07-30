import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import * as fromGame from '../../stores/game/game.selectors';

import { WinGuard } from './win.guard';

describe('WinGuard', () => {
  let guard: WinGuard;
  let store: MockStore;
  let router: Router;

  const route: Route = { path: 'game/win' };
  const urlTree = jasmine.createSpyObj<UrlTree>('Urltree', ['toString']);
  const routerMock = jasmine.createSpyObj<Router>('router', ['createUrlTree']);
  routerMock.createUrlTree.and.returnValue(urlTree);

  const activatedRouteSnapshot: ActivatedRouteSnapshot =
    new ActivatedRouteSnapshot();
  const routerStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
    'routerStateSnapshot',
    ['toString']
  );

  beforeEach(() =>
    MockBuilder(WinGuard)
      .provide(provideMockStore())
      .provide({ provide: Router, useValue: routerMock })
  );

  beforeEach(() => {
    guard = MockRender(WinGuard).point.componentInstance;
    router = ngMocks.findInstance(Router);
    store = ngMocks.findInstance(MockStore);
    routerMock.createUrlTree.calls.reset();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when win', () => {
    beforeEach(() => {
      store.overrideSelector(fromGame.getWin, true);
    });

    it('should load', () => {
      expect(guard.canLoad(route, [])).toBeObservable(cold('a', { a: true }));
      expect(router.createUrlTree).toHaveBeenCalledTimes(0);
    });

    it('should activate', () => {
      expect(
        guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)
      ).toBeObservable(cold('a', { a: true }));
    });
  });

  describe('when not win', () => {
    beforeEach(() => {
      store.overrideSelector(fromGame.getWin, false);
    });

    it('should not load', () => {
      expect(guard.canLoad(route, [])).toBeObservable(
        cold('a', { a: urlTree })
      );

      expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
      expect(router.createUrlTree).toHaveBeenCalledTimes(1);
    });

    it('should not activate', () => {
      expect(
        guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)
      ).toBeObservable(cold('a', { a: urlTree }));

      expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
      expect(router.createUrlTree).toHaveBeenCalledTimes(1);
    });
  });
});
