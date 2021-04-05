import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterReducerState } from '@ngrx/router-store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { selectUrl } from './shared/stores/router/router.selectors';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<RouterReducerState>;

  let mockSelector;

  const initTestBed = () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
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

  it('should display background and cubes', () => {
    mockSelector = store.overrideSelector(selectUrl, '/');
    store.refreshState();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('#background')
    ).not.toBeUndefined();
    expect(fixture.nativeElement.querySelectorAll('.cube').length).toEqual(5);
  });

  it('should display background and not cubes on other routes', () => {
    mockSelector = store.overrideSelector(selectUrl, '/fake');
    store.refreshState();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('#background')
    ).not.toBeUndefined();
    expect(fixture.nativeElement.querySelectorAll('.cube').length).toEqual(0);
  });
});
