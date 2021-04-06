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
  chars$ = this.store.select(fromGame.getChars);

  formGroup = this.fb.group({
    char: [null, [Validators.required, Validators.maxLength(1)]],
  });
  constructor(private store: Store, private fb: FormBuilder) {}

  try(): void {
    this.store.dispatch(
      GameActions.tryChar({
        char: this.formGroup.value.char.toLowerCase(),
      })
    );
    this.formGroup.reset();
  }
}
