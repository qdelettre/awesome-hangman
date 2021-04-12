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

import { OverGuard } from './over.guard';

describe('OverGuard', () => {
  let guard: OverGuard;
  let store: MockStore;

  const route: Route = { path: 'game/over' };
  const urlTree = jasmine.createSpyObj<UrlTree>('Urltree', ['toString']);
  const router = jasmine.createSpyObj<Router>('router', ['createUrlTree']);
  router.createUrlTree.and.returnValue(urlTree);

  const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
  const routerStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
    'routerStateSnapshot',
    ['toString']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    });
    guard = TestBed.inject(OverGuard);
    store = TestBed.inject(MockStore);
    router.createUrlTree.calls.reset();
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
