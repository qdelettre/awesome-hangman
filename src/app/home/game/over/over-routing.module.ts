import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverComponent } from './over.component';

const routes: Routes = [{ path: '', component: OverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverRoutingModule {}
