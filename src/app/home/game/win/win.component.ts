import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinComponent {}
