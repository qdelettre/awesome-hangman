import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'app-char',
  templateUrl: './char.component.html',
  styleUrls: ['./char.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharComponent {
  @HostBinding('class.space') get space() {
    return this.char === ' ';
  }

  @Input() char: string | null = null;
}
