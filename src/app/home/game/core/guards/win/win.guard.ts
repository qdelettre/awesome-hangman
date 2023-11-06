import { Injectable } from '@angular/core';
import {
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromGame from '../../stores/game/game.selectors';

@Injectable({
  providedIn: 'root',
})
export class WinGuard {
  win$ = this.store
    .select(fromGame.getWin)
    .pipe(map((win) => (win ? true : this.router.createUrlTree(['/']))));

  constructor(private store: Store, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.win$;
  }
  canLoad(
    _route: Route,
    _segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.win$;
  }
}
