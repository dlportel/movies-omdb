import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {globalAnimation} from '../../../core/animations/global.animation';
import {Observable} from 'rxjs';
import {IUser} from '../../../core/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {IUserNgRxService} from '../../../store/interfaces/user-ng-rx.service';
import {NGRX_USER_SERVICE} from '../../../injectors';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [globalAnimation]
})
export class MainMenuComponent implements OnInit {
  public isLogged$: Observable<boolean>;
  public userData$: Observable<IUser>;
  public items = [
    {
      route: 'home',
      title: 'Home'
    },
  ] as { route: string, title: string }[];

  constructor(private _dialog: MatDialog,
              private _router: Router,
              @Inject(NGRX_USER_SERVICE) private _userService: IUserNgRxService) {
  }

  ngOnInit() {
    this._userService.keepLogin();
    this.isLogged$ = this._userService.getIsLogged();
    this.userData$ = this._userService.getUser().pipe(filter(data => !!data));
  }

  public login() {
    this._dialog.open(LoginModalComponent, {
      maxWidth: '400px'
    });
  }

  public logout() {
    this._userService.logout();
    this._router.navigate(['/']);
  }
}
