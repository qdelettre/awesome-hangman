import { ComponentFixture } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

import { OverComponent } from './over.component';
import { OverModule } from './over.module';

describe('OverComponent', () => {
  let fixture: ComponentFixture<OverComponent>;

  beforeEach(() => MockBuilder(OverComponent, OverModule));

  beforeEach(() => {
    fixture = MockRender(OverComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have title', () => {
    expect(
      fixture.nativeElement.querySelector('h1.mat-display-1').textContent
    ).toEqual('Game over !');
  });

  it('should have buttons and links', () => {
    const buttons = ngMocks.findInstances(MatButton);
    const buttonNodeList: NodeList =
      fixture.nativeElement.querySelectorAll('button');

    expect(buttons[0].color).toEqual('primary');
    expect(buttonNodeList[0].textContent).toEqual('Play again');

    const routerLinks = ngMocks.findInstances(RouterLink);

    expect(routerLinks[0].routerLink).toEqual('..');

    expect(buttons[1].color).toEqual(undefined);
    expect(buttonNodeList[1].textContent).toEqual('Home');

    expect(routerLinks[1].routerLink).toEqual('/');
  });
});
