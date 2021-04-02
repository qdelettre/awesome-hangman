import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  const initTestBed = () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  };

  beforeEach(initTestBed);

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have as title 'awesome-hangman'`, () => {
    expect(fixture.componentInstance.title).toEqual('awesome-hangman');
  });

  it('should render title', () => {
    expect(fixture.nativeElement.querySelector('*').textContent).toEqual('');
  });
});
