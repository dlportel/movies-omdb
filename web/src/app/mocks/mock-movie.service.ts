import {MovieService} from '../core/classes/movie.service';
import {IParamsOmdb} from '../core/models/omdb-item.model';
import {Observable, of} from 'rxjs';

export class MockMovieService extends MovieService {
  key = 'Testing_mock';
  contextPath = '';

  getItems(params: IParamsOmdb): Observable<any> {
    return of([1, 2, 3, 4, 5, 6, 7]);
  }

  getItem(data: { [p: string]: any }): Observable<any> {
    return undefined;
  }

}
