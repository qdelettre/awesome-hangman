import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MockComponent, MockDirective, ngMocks } from 'ng-mocks';

import { WinComponent } from './win.component';

describe('WinComponent', () => {
  let component: WinComponent;
  let fixture: ComponentFixture<WinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WinComponent,
        MockComponent(MatButton),
        MockDirective(RouterLink),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(
      fixture.nativeElement.querySelector('h1.mat-display-1').textContent
    ).toEqual('You won !');
  });

  it('should have buttons and links', () => {
    const buttons = ngMocks.findInstances(MatButton);
    const buttonNodeList: NodeList = fixture.nativeElement.querySelectorAll(
      'button'
    );

    expect(buttons[0].color).toEqual('primary');
    expect(buttonNodeList[0].textContent).toEqual('Play again');

    const routerLinks = ngMocks.findInstances(RouterLink);

    expect(routerLinks[0].routerLink).toEqual('..');

    expect(buttons[1].color).toEqual(undefined);
    expect(buttonNodeList[1].textContent).toEqual('Home');

    expect(routerLinks[1].routerLink).toEqual('/');
  });
});
