import { ComponentFixture } from '@angular/core/testing';
import { RouterReducerState } from '@ngrx/router-store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { selectUrl } from './shared/stores/router/router.selectors';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<RouterReducerState>;

  beforeEach(() =>
    MockBuilder(AppComponent, AppModule).provide(provideMockStore())
  );

  beforeEach(() => {
    fixture = MockRender(AppComponent);
    store = ngMocks.findInstance(MockStore);
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', () => {
    expect(fixture.nativeElement.querySelector('*').textContent).toEqual('');
  });

  it('should display background and cubes', () => {
    store.overrideSelector(selectUrl, '/');
    store.refreshState();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('#background')
    ).not.toBeUndefined();

    expect(fixture.nativeElement.querySelectorAll('.cube').length).toEqual(5);
  });

  it('should display background and not cubes on other routes', () => {
    store.overrideSelector(selectUrl, '/fake');
    store.refreshState();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('#background')
    ).not.toBeUndefined();

    expect(fixture.nativeElement.querySelectorAll('.cube').length).toEqual(0);
  });
});
