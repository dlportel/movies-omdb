import {Injectable} from '@angular/core';
import {MovieService} from '../core/classes/movie.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Helpers} from '../core/utils/helpers';
import {IItemFullOmdb, IOmdbSearchApiResponse, IParamsOmdb, ISearchOmdb} from '../core/models/omdb-item.model';
import {IApiResponse} from '../core/models/commons.model';

@Injectable()
export class OmdbService extends MovieService {

  public contextPath = 'http://www.omdbapi.com/';
  public key = 'f12ba140';

  constructor(private _httpClient: HttpClient) {
    super();
  }

  public getItem(data: IParamsOmdb): Observable<IItemFullOmdb> {
    const params = Helpers.appendDataToParams({...data, apikey: this.key});
    return this._httpClient.get<any>(`${this.contextPath}`, {params}).pipe(
      map((response) => {
        if (response) {
          return response;
        } else {
          throw new Error(Helpers.handleError(response));
        }
      }));
  }

  public getItems(data: ISearchOmdb): Observable<IApiResponse> {
    const params = Helpers.appendDataToParams({...data, apikey: this.key});
    return this._httpClient.get<IOmdbSearchApiResponse>(`${this.contextPath}`, {params}).pipe(
      map((response) => {
        if (response?.Response === 'True') {
          return {docs: response.Search, total: response.totalResults};
        } else {
          return {docs: [], total: 0};
        }
      }));
  }

}
