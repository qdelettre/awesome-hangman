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
    standalone: true,
})
export class CharComponent {
  @Input() char: string | null = null;
  @HostBinding('class.space') get space() {
    return this.char === ' ';
  }
}
