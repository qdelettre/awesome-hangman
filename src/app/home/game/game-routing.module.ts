import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  {
    path: 'over',
    loadChildren: () => import('./over/over.module').then((m) => m.OverModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
