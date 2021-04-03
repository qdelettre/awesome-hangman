import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { WordEffects } from './core/stores/word/word.effects';
import { GameEffects } from './core/stores/game/game.effects';
import * as fromGame from './core/stores/game/game.reducer';
import * as fromWord from './core/stores/word/word.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    GameRoutingModule,
    StoreModule.forFeature(fromGame.gameFeatureKey, fromGame.reducer),
    StoreModule.forFeature(fromWord.wordFeatureKey, fromWord.reducer),
    EffectsModule.forFeature([WordEffects, GameEffects]),
  ],
})
export class GameModule {}
