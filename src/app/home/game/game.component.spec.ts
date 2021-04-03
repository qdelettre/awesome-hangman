import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MockComponents, MockDirective, MockModule, ngMocks } from 'ng-mocks';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { GameComponent } from './game.component';
import * as fromGame from './core/stores/game/game.reducer';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: MockStore;
  const initialState = {
    [fromGame.gameFeatureKey]: fromGame.initialState,
  };

  const initTestBed = () => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        MockComponents(MatButton, MatIcon),
        MockDirective(RouterLink),
      ],
      imports: [MockModule(MatToolbarModule)],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  };

  beforeEach(initTestBed);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have toolbar', () => {
    const mockToolbar = ngMocks.findInstance(MatToolbar);
    expect(mockToolbar.color).toEqual('primary');
  });

  it('should have start button', () => {
    expect(
      fixture.nativeElement
        .querySelector('mat-toolbar button')
        .textContent.trim()
    ).toEqual('arrow_backReturn');
    expect(
      fixture.nativeElement.querySelector('mat-toolbar button mat-icon')
        .textContent
    ).toEqual('arrow_back');

    const mockDirective = ngMocks.get(
      ngMocks.find('mat-toolbar button'),
      RouterLink
    );
    expect(mockDirective.routerLink).toEqual('..');
  });

  it('should show word length when word not empty', () => {
    store.setState({
      [fromGame.gameFeatureKey]: { ...fromGame.initialState, word: 'word' },
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').textContent).toEqual(
      `length: 4`
    );
  });
});
