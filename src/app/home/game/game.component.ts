import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  wordChars$ = this.store.select(fromGame.getWordChars);
  guess$ = this.store.select(fromGame.getGuess);

  maxErrors$ = this.store.select(fromGame.getMaxErrors);
  errors$ = this.store.select(fromGame.getErrors);

  formGroup = this.fb.group({
    guess: [null, Validators.required],
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  guess(): void {
    this.store.dispatch(
      GameActions.guess({
        charOrWord: this.formGroup.value.guess.toLowerCase(),
      })
    );
    this.formGroup.reset();
  }
}
