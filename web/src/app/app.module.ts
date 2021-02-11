import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './core/auth/auth-interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {appReducers, clearState} from './store/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './store/effects';
import {SharedModule} from './shared/shared.module';
import {FakeAuthService} from './services/fake-auth.service';
import {HandleTokenService} from './services/handle-token.service';
import {HandleLocalStorageService} from './services/handle-local-storage.service';
import {MaterialUtilsService} from './services/material-utils.service';
import {LOCAL_STORAGE_SERVICE, NGRX_USER_SERVICE, TOKEN_SERVICE} from './injectors';
import {UserNgRxService} from './store/services/user-ng-rx.service';
import {AuthService} from './core/classes/auth.service';
import {IUtilsService, UtilService} from './core/classes/utils.service';
import {ITokenService} from './core/classes/token.service';
import {ILocalStorageService} from './core/classes/local-storage.service';
import {ServiceWorkerModule} from '@angular/service-worker';

const routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'}, // If no matching route found, go to home route
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(routes,
      {
        enableTracing: false,
        scrollPositionRestoration: 'enabled',
        paramsInheritanceStrategy: 'always'
      },),
    StoreModule.forRoot(appReducers, {
      metaReducers: [clearState],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : [],
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    {provide: 'LOCALSTORAGE', useFactory: getLocalStorage},
    // OPTION 1:  inject based in interface using new InjectionToken
    {provide: NGRX_USER_SERVICE, useClass: UserNgRxService},
    {provide: TOKEN_SERVICE, useClass: HandleTokenService, deps: ['LOCALSTORAGE']},
    {provide: LOCAL_STORAGE_SERVICE, useClass: HandleLocalStorageService},
    // OPTION 2: inject based in abstract class
    {provide: AuthService, useFactory: getAuthService, deps: [TOKEN_SERVICE, LOCAL_STORAGE_SERVICE, UtilService]},
    {provide: UtilService, useClass: MaterialUtilsService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [UtilService, AuthService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// AoT requires an exported function for factories
function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

// if environment is develop, then use fake auth service. Need to create a service for production environment
function getAuthService(tokenService: ITokenService, storageService: ILocalStorageService, utilService: IUtilsService) {
  return !environment.production ? new FakeAuthService(tokenService, storageService, utilService) : null;
}

