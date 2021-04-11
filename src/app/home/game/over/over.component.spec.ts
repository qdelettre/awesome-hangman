import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MockComponent, MockDirective, ngMocks } from 'ng-mocks';

import { OverComponent } from './over.component';

describe('OverComponent', () => {
  let component: OverComponent;
  let fixture: ComponentFixture<OverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverComponent,
        MockComponent(MatButton),
        MockDirective(RouterLink),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(
      fixture.nativeElement.querySelector('h1.mat-display-1').textContent
    ).toEqual('Game over !');
  });

  it('should have title button and link', () => {
    const button = ngMocks.findInstance(MatButton);

    expect(button.color).toEqual('primary');
    expect(fixture.nativeElement.querySelector('button').textContent).toEqual(
      'Play again'
    );

    const routerLink = ngMocks.findInstance(RouterLink);

    expect(routerLink.routerLink).toEqual('..');
  });
});
