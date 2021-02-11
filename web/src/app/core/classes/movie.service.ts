import {Observable} from 'rxjs';
import {IApiResponse} from '../models/commons.model';
import {IItemFullOmdb} from '../models/omdb-item.model';

export interface IMovieService {
  key: string;
  contextPath: string;

  getItem(data: { [key: string]: any }): Observable<IItemFullOmdb>;

  getItems(data: { [key: string]: any }): Observable<IApiResponse>;
}

export abstract class MovieService implements IMovieService {
  abstract key: string;
  abstract contextPath: string;

  abstract getItem(data: { [key: string]: any }): Observable<IItemFullOmdb>;

  abstract getItems(data: { [key: string]: any }): Observable<IApiResponse>;

}
