import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockRender } from 'ng-mocks';

import { CharComponent } from './char.component';

describe('CharComponent', () => {
  let component: CharComponent;
  let fixture: ComponentFixture<CharComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [CharComponent],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = MockRender(CharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have char and space false', () => {
    const char = 'x';
    component.char = char;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').textContent).toEqual(
      char
    );
  });

  it('should not have char and space true', () => {
    component.char = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').textContent).toEqual('');
  });
});
