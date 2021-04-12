import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverGuard } from './core/guards/over/over.guard';
import { WinGuard } from './core/guards/win/win.guard';
import { GameComponent } from './game.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  {
    path: 'over',
    canActivate: [OverGuard],
    canLoad: [OverGuard],
    loadChildren: () => import('./over/over.module').then((m) => m.OverModule),
  },
  {
    path: 'win',
    canActivate: [WinGuard],
    canLoad: [WinGuard],
    loadChildren: () => import('./win/win.module').then((m) => m.WinModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
