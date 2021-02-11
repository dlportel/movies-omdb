import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UtilService} from '../classes/utils.service';
import {Helpers} from '../utils/helpers';
import {AuthService} from '../classes/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _handleUtils: UtilService,
              private _handleAuth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this._handleAuth.getAuthToken();
    if (!!authToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      // if (req.url.includes(environment.hostApi)) {
      //   const authReq = req.clone({
      //     headers: req.headers.set('Authorization', 'bearer ' + authToken)
      //   });
      //   return this._handleError(authReq, next);
      // }
    }
    return this._handleError(req, next);
  }

  private _handleError(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const success = 'False' !== event.body.Response;
          if (success === false) {
            const error = Helpers.handleError(event.body);
            if (error) {
              this._handleUtils.openSnackBar(error);
            } else {
              this._handleUtils.openSnackBar('Error en la petición');
            }
            this._handleUtils.endLoading();
          }
        }
      })
    );
  }
}
