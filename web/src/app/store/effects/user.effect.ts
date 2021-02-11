import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {filter, map, take, withLatestFrom} from 'rxjs/operators';
import * as authAction from '../actions/user.action';
import {Router} from '@angular/router';
import {AuthService} from '../../core/classes/auth.service';
import {Store} from '@ngrx/store';
import {IUserState} from '../reducers/user.reducer';
import {getUserState} from '../reducers';
import {Favorite} from '../actions/user.action';

@Injectable()
export class UserEffect {
  @Effect()
  keepLogin$ = this._actions$.pipe(
    ofType(authAction.KEEP_LOGIN),
    map((action: authAction.KeepLogin) => {
      try {
        const {data, success} = this._handleAuth.keepLogin();
        if (success) {
          return new authAction.LoginSuccess(data);
        } else {
          return new authAction.LoginFail('DONT LOGGED');
        }
      } catch (error) {
        return new authAction.LoginFail(error);
      }
    })
  );
  @Effect()
  login$ = this._actions$.pipe(
    ofType(authAction.LOGIN),
    map((action: authAction.Login) => {
      try {
        const user = this._handleAuth.login(action.payload);
        return new authAction.LoginSuccess(user);
      } catch (error) {
        return new authAction.LoginFail(error);
      }
    })
  );
  @Effect({dispatch: false})
  loginSuccess$ = this._actions$.pipe(
    ofType(authAction.LOGIN_SUCCESS),
    map((action: authAction.LoginSuccess) => {
    })
  );
  @Effect({dispatch: false})
  loginFail$ = this._actions$.pipe(
    ofType(authAction.LOGIN_FAIL),
    map((action: authAction.LoginFail) => {
    })
  );
  @Effect({dispatch: false})
  logout$ = this._actions$.pipe(
    ofType(authAction.LOGOUT),
    map((action: authAction.LoginFail) => {
      this._handleAuth.logout();
    })
  );
  @Effect()
  favorite$ = this._actions$.pipe(
    ofType(authAction.FAVORITE),
    map((action: Favorite) => action.payload),
    withLatestFrom(this._store.select(getUserState).pipe(filter(data => data.user !== null))),
    map(([id, selectData]) => {
      try {
        const favorites = [...selectData.user.favorites];
        const index = favorites.findIndex(f => f === id);
        if (index === -1) {
          favorites.push(id);
        } else {
          favorites.splice(index, 1);
        }
        const user = this._handleAuth.updateUser({favorites});
        return new authAction.FavoriteSuccess(user.favorites);
      } catch (error) {
        return new authAction.FavoriteFail(error);
      }
    })
  );
  @Effect({dispatch: false})
  favoriteSuccess$ = this._actions$.pipe(
    ofType(authAction.FAVORITE_SUCCESS),
    map((action: authAction.FavoriteSuccess) => {
    })
  );
  @Effect({dispatch: false})
  favoriteFail$ = this._actions$.pipe(
    ofType(authAction.FAVORITE_FAIL),
    map((action: authAction.FavoriteFail) => {
    })
  );

  constructor(private _actions$: Actions,
              private _store: Store<IUserState>,
              private _handleAuth: AuthService,
              private _router: Router) {
  }

}
