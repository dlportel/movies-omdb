import {InjectionToken} from '@angular/core';
import {ITokenService} from './core/classes/token.service';
import {ILocalStorageService} from './core/classes/local-storage.service';
import {IUserNgRxService} from './store/interfaces/user-ng-rx.service';

export const TOKEN_SERVICE = new InjectionToken<ITokenService>('TokenService');
export const LOCAL_STORAGE_SERVICE = new InjectionToken<ILocalStorageService>('LocalStorageService');

// redux services
export const NGRX_USER_SERVICE = new InjectionToken<IUserNgRxService>('UserNgRxService');
