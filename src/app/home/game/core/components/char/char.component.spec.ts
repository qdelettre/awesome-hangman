import { ComponentFixture } from '@angular/core/testing';
import { MockBuilder, MockRender } from 'ng-mocks';

import { CharComponent } from './char.component';

describe('CharComponent', () => {
  let fixture: ComponentFixture<CharComponent>;

  beforeEach(() => MockBuilder(CharComponent));

  beforeEach(() => {
    fixture = MockRender(CharComponent);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should have char and space false', () => {
    const char = 'x';
    fixture.componentInstance.char = char;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').textContent).toEqual(
      char
    );
  });

  it('should not have char and space true', () => {
    fixture.componentInstance.char = null;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').textContent).toEqual('');
  });
});
