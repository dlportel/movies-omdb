import {IUser} from '../../core/models/user.model';
import {Observable} from 'rxjs';

export interface IUserNgRxService {
  keepLogin(): void;

  login(data: IUser): Observable<any>;

  setFavorite(id: string): Observable<any>;

  logout(): void;

  getIsLogged(): Observable<boolean>;

  getUser(): Observable<IUser>;

  getIsInit(): Observable<boolean>;
}
