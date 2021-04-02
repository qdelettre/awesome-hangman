import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    GameRoutingModule,
  ],
})
export class GameModule {}
