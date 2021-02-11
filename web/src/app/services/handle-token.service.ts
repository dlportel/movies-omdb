import {Injectable} from '@angular/core';
import {ITokenService} from '../core/classes/token.service';
import {environment} from '../../environments/environment';
import {ILocalStorageService} from '../core/classes/local-storage.service';

// import decode from 'jwt-decode';

@Injectable()
export class HandleTokenService implements ITokenService {

  constructor(private _handleStorage: ILocalStorageService) {
  }

  // fake create token
  public codeToken<T>(value: T): string {
    return environment.authorization.secret;
  }

  public decodeToken<T>(token: string): T {
    // fake decode token
    return JSON.parse(this._handleStorage.getItem('userData')) as T;
  }
}
