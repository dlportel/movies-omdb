import {Injectable} from '@angular/core';
import {IUser, User} from '../core/models/user.model';
import {ITokenService} from '../core/classes/token.service';
import {ILocalStorageService} from '../core/classes/local-storage.service';
import {AuthService} from '../core/classes/auth.service';
import {IUtilsService} from '../core/classes/utils.service';

@Injectable()
export class FakeAuthService extends AuthService {

  constructor(private _handleToken: ITokenService,
              private _handleStorage: ILocalStorageService,
              private _handleUtils: IUtilsService) {
    super();
  }

  public login(data: IUser): IUser {
    this._handleUtils.startLoading();
    const token = this._handleToken.codeToken<IUser>(data);
    const user = new User({...data});
    this._handleStorage.setItem('authToken', token);
    this._handleStorage.setItem('userData', JSON.stringify(user));
    this._handleUtils.endLoading();
    return user;
  }

  public getAuthToken() {
    return this._handleStorage.getItem('authToken');
  }

  public logout(): void {
    this._handleStorage.removeItem('authToken');
    this._handleStorage.removeItem('authData');
  }

  public keepLogin(): { success: boolean; data?: IUser } {
    const token = this._handleStorage.getItem('authToken');
    if (!token) {
      return {success: false};
    }
    const userData = this._handleToken.decodeToken<IUser>(token);
    if (!userData) {
      return {success: false};
    }
    return {success: true, data: userData};
  }

  public updateUser(data: IUser): IUser {
    const token = this._handleStorage.getItem('authToken');
    const authData = this._handleToken.decodeToken<IUser>(token);
    const updatedData = {
      ...authData,
      ...data
    };
    this._handleStorage.setItem('userData', JSON.stringify(updatedData));
    return updatedData;
  }
}
