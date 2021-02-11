import {Inject, Injectable} from '@angular/core';
import {ILocalStorageService} from '../core/classes/local-storage.service';

@Injectable()
export class HandleLocalStorageService implements ILocalStorageService {

  constructor(@Inject('LOCALSTORAGE') private _localStorage: any) {
  }

  public exist(name: string): boolean {
    return this._localStorage?.hasOwnProperty(name);
  }

  public getItem(name: string): string {
    return this._localStorage?.getItem(name);
  }

  public setItem(name: string, value: string) {
    this._localStorage?.setItem(name, value);
  }

  public removeItem(name: string) {
    this._localStorage.removeItem(name);
  }

  public clear() {
    this._localStorage.clear();
  }
}
