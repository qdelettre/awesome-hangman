import { ComponentFixture } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Mock, MockBuilder, MockRender, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { GameComponent } from './game.component';
import * as fromGame from './core/stores/game/game.selectors';

import { CharComponent } from './core/components/char/char.component';
import * as GameActions from './core/stores/game/game.actions';
import { FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initialState } from './core/stores/game/game.reducer';
import { CdkTrapFocus } from '@angular/cdk/a11y';

describe('GameComponent', () => {
  let fixture: ComponentFixture<GameComponent>;
  let store: MockStore;
  const word = 'word';

  beforeEach(() =>
    MockBuilder(GameComponent)
      .provide(
        provideMockStore({
          selectors:[
            {selector: fromGame.getWordChars, value: [] },
            {selector: fromGame.getGuess, value:[] },
            {selector: fromGame.getMaxErrors, value:initialState.rules.maxErrors },
            {selector: fromGame.getErrors, value:0 },
          ]
        })
      )
      .keep(ReactiveFormsModule)
      .keep(NG_MOCKS_ROOT_PROVIDERS)
  );

  beforeEach(() => {
    fixture = MockRender(GameComponent);
    store = ngMocks.findInstance(MockStore);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have toolbar', () => {
    const mockToolbar = ngMocks.findInstance(MatToolbar);

    expect(mockToolbar.color).toEqual('primary');
  });

  it('should have back button', () => {
    expect(
      fixture.nativeElement
        .querySelector('mat-toolbar button')
        .textContent.trim()
    ).toEqual('arrow_back');

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
});
