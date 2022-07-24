import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { ngMocks, MockBuilder, MockRender } from 'ng-mocks';
import * as fromGame from '../../stores/game/game.selectors';

import { OverGuard } from './over.guard';

describe('OverGuard', () => {
  let guard: OverGuard;
  let store: MockStore;
  let router: Router;

  const route: Route = { path: 'game/over' };
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
    MockBuilder(OverGuard)
      .provide(provideMockStore())
      .provide({ provide: Router, useValue: routerMock })
  );

  beforeEach(() => {
    guard = MockRender(OverGuard).point.componentInstance;
    router = ngMocks.findInstance(Router);
    store = ngMocks.findInstance(MockStore);
    routerMock.createUrlTree.calls.reset();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when game over', () => {
    beforeEach(() => {
      store.overrideSelector(fromGame.getLoose, true);
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

  describe('when not game over', () => {
    beforeEach(() => {
      store.overrideSelector(fromGame.getLoose, false);
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
