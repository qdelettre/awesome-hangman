import { ComponentFixture } from '@angular/core/testing';
import { MockBuilder, MockRender } from 'ng-mocks';

import { ErrorCountDisplayComponent } from './error-count-display.component';

describe('ErrorCountDisplayComponent', () => {
  let fixture: ComponentFixture<ErrorCountDisplayComponent>;

  beforeEach(() => MockBuilder(ErrorCountDisplayComponent));

  beforeEach(() => {
    fixture = MockRender(ErrorCountDisplayComponent);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should have a span with count and max', () => {
    fixture.componentInstance.count = 1;
    fixture.componentInstance.max = 2;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('span.mat-body-strong').textContent
    ).toEqual('1 / 2 errors');
  });
});
