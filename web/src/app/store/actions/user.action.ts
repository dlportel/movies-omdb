import {Action} from '@ngrx/store';
import {IUser} from '../../core/models/user.model';

export const KEEP_LOGIN = '[USER] Keep Login';
export const LOGIN = '[USER] Login';
export const LOGIN_FAIL = '[USER] Login Fail';
export const LOGIN_SUCCESS = '[USER] Login Success';

export class KeepLogin implements Action {
  readonly type = KEEP_LOGIN;

  constructor() {
  }
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: IUser) {
  }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: any) {
  }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export const LOGOUT = '[USER] Logout';

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor() {
  }
}

export const FAVORITE = '[USER] Favorite';
export const FAVORITE_FAIL = '[USER] Favorite Fail';
export const FAVORITE_SUCCESS = '[USER] Favorite Success';

export class Favorite implements Action {
  readonly type = FAVORITE;

  constructor(public payload: string) {
  }
}

export class FavoriteFail implements Action {
  readonly type = FAVORITE_FAIL;

  constructor(public payload: any) {
  }
}

export class FavoriteSuccess implements Action {
  readonly type = FAVORITE_SUCCESS;

  constructor(public payload: string[]) {
  }
}

export type AuthActions =
  | KeepLogin
  | Login
  | LoginSuccess
  | LoginFail
  | Logout
  | Favorite
  | FavoriteFail
  | FavoriteSuccess;
