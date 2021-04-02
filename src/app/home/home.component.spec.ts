import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MockComponent, MockDirective, ngMocks } from 'ng-mocks';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const initTestBed = () => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(MatButton),
        MockDirective(RouterLink),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(initTestBed);

  it('should create', () => {
    expect(component).toBeTruthy();
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
