import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, HomeRoutingModule, MatButtonModule, HomeComponent],
})
export class HomeModule {}
