import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import * as fromGame from '../../stores/game/game.selectors';

import { WinGuard } from './win.guard';

describe('WinGuard', () => {
  let guard: WinGuard;
  let store: MockStore;

  const route: Route = { path: 'game/win' };
  const urlTree = jasmine.createSpyObj<UrlTree>('Urltree', ['toString']);
  const router = jasmine.createSpyObj<Router>('router', ['createUrlTree']);
  router.createUrlTree.and.returnValue(urlTree);

  const activatedRouteSnapshot: ActivatedRouteSnapshot =
    new ActivatedRouteSnapshot();
  const routerStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
    'routerStateSnapshot',
    ['toString']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    });
    guard = TestBed.inject(WinGuard);
    store = TestBed.inject(MockStore);
    router.createUrlTree.calls.reset();
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
