import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromGame from './core/stores/game/game.selectors';
import * as GameActions from './core/stores/game/game.actions';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { A11yModule } from '@angular/cdk/a11y';
import { ErrorCountDisplayComponent } from './core/components/error-count-display/error-count-display.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CharComponent } from './core/components/char/char.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterLink,
        MatIconModule,
        NgIf,
        NgFor,
        CharComponent,
        MatCardModule,
        MatChipsModule,
        ErrorCountDisplayComponent,
        FormsModule,
        A11yModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        AsyncPipe,
    ],
})
export class GameComponent {
  @ViewChild('input')
  input!: MatInput;

  readonly wordChars$ = this.store.select(fromGame.getWordChars);
  readonly guess$ = this.store.select(fromGame.getGuess);

  readonly maxErrors$ = this.store.select(fromGame.getMaxErrors);
  readonly errors$ = this.store.select(fromGame.getErrors);

  readonly formGroup = new FormGroup({
    guess: new FormControl<string>('', Validators.required),
  });

  constructor(private store: Store) {}

  guess(): void {
    if (this.formGroup.value.guess) {
      this.store.dispatch(
        GameActions.guess({
          charOrWord: this.formGroup.value.guess.toLowerCase(),
        })
      );
      this.formGroup.reset();
    }
  }
}
