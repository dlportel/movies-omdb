import {merge} from 'lodash-es';

interface ICommonGetOmdb {
  y?: string;
  type?: OmdbTypesEnum;
  apikey?: string;
}

export interface IParamsOmdb extends ICommonGetOmdb {
  plot?: PlotEnum;
  t?: string; // 	Movie title to search for.
  i?: string; // 	A valid IMDb ID (e.g. tt1285016)
}

export class ParamsOmdb implements IParamsOmdb {
  type?: OmdbTypesEnum;
  plot?: PlotEnum;
  t?: string;
  i?: string;
  apikey?: string;

  constructor(options?: IParamsOmdb) {
    merge(this, this._getDefaults(), options);
  }

  private _getDefaults(): IParamsOmdb {
    return {
      type: null,
      plot: null,
      t: null,
      i: null,
      apikey: null,
    };
  }
}


export interface ISearchOmdb extends ICommonGetOmdb {
  s?: string; // 	Movie title to search for.
  i?: string; // 	A valid IMDb ID (e.g. tt1285016)
  page?: number; // Page number to return.
}

export class SearchOmdb implements ISearchOmdb {
  type?: OmdbTypesEnum;
  i?: string;
  apikey?: string;
  s?: string;
  page?: number;

  constructor(options?: ISearchOmdb) {
    merge(this, this._getDefaults(), options);
  }

  private _getDefaults(): ISearchOmdb {
    return {
      type: null,
      i: null,
      apikey: null,
      s: null,
      page: 1
    };
  }
}

export interface IItemFullOmdb extends IItemBasicOmdb {
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Production?: string;
  Rated?: string;
  Ratings?: [];
  Released?: string;
  Response?: string;
  Runtime?: string;
  Website?: string;
  Writer?: string;
  imdbRating?: string;
  imdbVotes?: string;
}

export interface IItemBasicOmdb {
  Poster?: string;
  Title?: string;
  Type?: string;
  Year?: string;
  imdbID?: string;
}

export enum OmdbTypesEnum {
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

export enum PlotEnum {
  short = 'short',
  full = 'full',
}


export interface IOmdbSearchApiResponse {
  Response?: 'True' | 'False';
  Search?: IItemBasicOmdb[];
  totalResults?: number;
}
