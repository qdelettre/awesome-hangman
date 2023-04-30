import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromGame from './core/stores/game/game.selectors';
import * as GameActions from './core/stores/game/game.actions';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
