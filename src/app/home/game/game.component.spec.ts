import { ComponentFixture } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { GameComponent } from './game.component';
import * as fromGame from './core/stores/game/game.reducer';
import { CharComponent } from './core/components/char/char.component';
import * as GameActions from './core/stores/game/game.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameModule } from './game.module';

describe('GameComponent', () => {
  let fixture: ComponentFixture<GameComponent>;
  let store: MockStore;
  const word = 'word';

  beforeEach(() =>
    MockBuilder(GameComponent, GameModule)
      .provide(
        provideMockStore({
          initialState: {
            [fromGame.gameFeatureKey]: fromGame.initialState,
          },
        })
      )
      .keep(FormsModule)
      .keep(ReactiveFormsModule)
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

  describe('when word not empty', () => {
    it('should show word length', () => {
      store.setState({
        [fromGame.gameFeatureKey]: { ...fromGame.initialState, word },
      });
      store.refreshState();
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('container-chars')
      ).not.toBeUndefined();

      const chars = ngMocks.findInstances(CharComponent);

      expect(chars.length).toEqual(4);
      expect(chars[0].char).toEqual(null);
      expect(chars[1].char).toEqual(null);
      expect(chars[2].char).toEqual(null);
      expect(chars[3].char).toEqual(null);
    });

    it('should show word length when chars', () => {
      store.setState({
        [fromGame.gameFeatureKey]: {
          ...fromGame.initialState,
          word,
          guess: ['w', 'd'],
        },
      });
      store.refreshState();
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('container-chars')
      ).not.toBeUndefined();

      const chars = ngMocks.findInstances(CharComponent);

      expect(chars.length).toEqual(4);
      expect(chars[0].char).toEqual('w');
      expect(chars[1].char).toEqual(null);
      expect(chars[2].char).toEqual(null);
      expect(chars[3].char).toEqual('d');
    });

    it('should try a char', () => {
      store.setState({
        [fromGame.gameFeatureKey]: { ...fromGame.initialState, word },
      });
      store.refreshState();
      fixture.detectChanges();

      const spyOnDispatch = spyOn(store, 'dispatch');
      const char = 'w';
      const input = ngMocks.find(['formControlName', 'guess']);
      ngMocks.change(input, char);
      fixture.detectChanges();

      expect(ngMocks.findInstances(MatButton)[1].disabled).toEqual(false);

      const button = ngMocks.find('form button');
      ngMocks.click(button);
      fixture.detectChanges();

      expect(spyOnDispatch).toHaveBeenCalledWith(
        GameActions.guess({
          charOrWord: char,
        })
      );

      expect(fixture.nativeElement.querySelector('input').value).toEqual('');
      expect(ngMocks.findInstances(MatButton)[1].disabled).toEqual(true);
    });
  });
});
