import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinRoutingModule } from './win-routing.module';
import { WinComponent } from './win.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, WinRoutingModule, MatButtonModule, WinComponent],
})
export class WinModule {}
