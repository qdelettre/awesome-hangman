import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-char',
  templateUrl: './char.component.html',
  styleUrls: ['./char.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharComponent {
  @Input() char: string | undefined;
}
