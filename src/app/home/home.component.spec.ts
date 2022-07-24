import { ComponentFixture } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => MockBuilder(HomeComponent, HomeModule));

  beforeEach(() => {
    fixture = MockRender(HomeComponent);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should have title', () => {
    expect(
      fixture.nativeElement.querySelector('h1.mat-display-1').textContent
    ).toEqual('Awesome Hangman');
  });

  it('should have start button', () => {
    expect(fixture.nativeElement.querySelector('button').textContent).toEqual(
      'Start'
    );
    const mockDirective = ngMocks.get(ngMocks.find('button'), RouterLink);

    expect(mockDirective.routerLink).toEqual('game');
  });
});
