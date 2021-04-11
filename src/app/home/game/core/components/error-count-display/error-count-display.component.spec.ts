import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockRender } from 'ng-mocks';

import { ErrorCountDisplayComponent } from './error-count-display.component';

describe('ErrorCountDisplayComponent', () => {
  let component: ErrorCountDisplayComponent;
  let fixture: ComponentFixture<ErrorCountDisplayComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [ErrorCountDisplayComponent],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = MockRender(ErrorCountDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a span with count and max', () => {
    component.count = 1;
    component.max = 2;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('span.mat-body-strong').textContent
    ).toEqual('1 / 2 errors');
  });
});
