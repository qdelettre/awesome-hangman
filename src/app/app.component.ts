import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as fromRouter from './shared/stores/router/router.selectors';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterOutlet,
        NgIf,
        AsyncPipe,
    ],
})
export class AppComponent {
  readonly showCubes$ = this.store.select(fromRouter.selectUrl).pipe(
    map((url) => url === '/'),
    distinctUntilChanged()
  );

  constructor(private store: Store<RouterReducerState>) {}
}
