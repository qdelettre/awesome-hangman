import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-error-count-display',
    templateUrl: './error-count-display.component.html',
    styleUrls: ['./error-count-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ErrorCountDisplayComponent {
  @Input() count: number | null = 0;
  @Input() max: number | null = null;
}
