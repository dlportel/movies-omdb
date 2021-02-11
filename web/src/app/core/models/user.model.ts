import {merge} from 'lodash-es';

export interface IUser {
  name?: string;
  favorites?: string[];
}

export class User implements IUser {
  name: string;
  favorites?: string[];

  constructor(options?: IUser) {
    merge(this, this._getDefaults(), options);
  }

  private _getDefaults(): IUser {
    return {
      name: null,
      favorites: []
    };
  }
}
