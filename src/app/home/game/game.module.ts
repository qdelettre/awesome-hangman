import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { WordEffects } from './core/stores/word/word.effects';
import { GameEffects } from './core/stores/game/game.effects';
import * as fromGame from './core/stores/game/game.reducer';
import * as fromWord from './core/stores/word/word.reducer';
import { StoreModule } from '@ngrx/store';
import { CharComponent } from './core/components/char/char.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { ErrorCountDisplayComponent } from './core/components/error-count-display/error-count-display.component';

@NgModule({
  declarations: [GameComponent, CharComponent, ErrorCountDisplayComponent],
  imports: [
    A11yModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule,
    GameRoutingModule,
    StoreModule.forFeature(fromGame.gameFeatureKey, fromGame.reducer),
    StoreModule.forFeature(fromWord.wordFeatureKey, fromWord.reducer),
    EffectsModule.forFeature([WordEffects, GameEffects]),
  ],
})
export class GameModule {}
