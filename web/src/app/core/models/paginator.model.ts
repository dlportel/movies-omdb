import {merge} from 'lodash-es';

export interface IPaginator {
  start?: number;
  end?: number;
}

export class Paginator implements IPaginator {
  start: number;
  end: number;

  constructor(options?: IPaginator) {
    merge(this, this._getDefaults(), options);
  }

  private _getDefaults(): IPaginator {
    return {
      start: 0,
      end: 50
    };
  }
}
