import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as fromRouter from './shared/stores/router/router.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'awesome-hangman';

  showCubes$ = this.store.select(fromRouter.selectUrl).pipe(
    map((url) => url === '/'),
    distinctUntilChanged()
  );

  constructor(private store: Store<RouterReducerState>) {}
}
