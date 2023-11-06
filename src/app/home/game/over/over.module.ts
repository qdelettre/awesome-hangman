import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverRoutingModule } from './over-routing.module';
import { OverComponent } from './over.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, OverRoutingModule, MatButtonModule, OverComponent],
})
export class OverModule {}
