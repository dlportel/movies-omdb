import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {ActionsSubject, Store} from '@ngrx/store';
import * as fromStore from '../index';
import {FavoriteSuccess, LoginSuccess} from '../index';
import {Observable} from 'rxjs';
import {IUser} from '../../core/models/user.model';
import {IUserNgRxService} from '../interfaces/user-ng-rx.service';
import {take} from 'rxjs/operators';

@Injectable()
export class UserNgRxService implements IUserNgRxService {

  constructor(private _actions$: Actions,
              private _store: Store<fromStore.AppState>,
              private _actionsSubj: ActionsSubject) {
  }

  public keepLogin() {
    this._store.dispatch(new fromStore.KeepLogin());
  }

  public login(data: IUser): Observable<LoginSuccess> {
    this._store.dispatch(new fromStore.Login(data));
    return this._actionsSubj.pipe(ofType(fromStore.LOGIN_SUCCESS), take(1));
  }

  public setFavorite(id: string): Observable<FavoriteSuccess> {
    this._store.dispatch(new fromStore.Favorite(id));
    return this._actionsSubj.pipe(ofType(fromStore.FAVORITE_SUCCESS), take(1));
  }

  public logout() {
    this._store.dispatch(new fromStore.Logout());
  }

  public getIsLogged(): Observable<boolean> {
    return this._store.select<boolean>(fromStore.getIsLogged);
  }

  public getIsInit(): Observable<boolean> {
    return this._store.select<boolean>(fromStore.getIsInit);
  }

  public getUser(): Observable<IUser> {
    return this._store.select<IUser>(fromStore.getUser);
  }
}
