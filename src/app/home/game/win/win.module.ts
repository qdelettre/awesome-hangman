import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinRoutingModule } from './win-routing.module';
import { WinComponent } from './win.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WinComponent],
  imports: [CommonModule, WinRoutingModule, MatButtonModule],
})
export class WinModule {}
