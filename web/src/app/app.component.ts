import {Component, Inject, OnInit} from '@angular/core';
import {IUserNgRxService} from './store/interfaces/user-ng-rx.service';
import {NGRX_USER_SERVICE} from './injectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(@Inject(NGRX_USER_SERVICE) private _userService: IUserNgRxService) {
  }

  ngOnInit() {
    this._userService.keepLogin();
  }
}
