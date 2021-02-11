import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {IItemBasicOmdb} from '../../../../core/models/omdb-item.model';
import {MatDialog} from '@angular/material/dialog';
import {ModalItemDetailsComponent} from '../../modals/modal-item-details/modal-item-details.component';
import {NGRX_USER_SERVICE} from '../../../../injectors';
import {IUserNgRxService} from '../../../../store/interfaces/user-ng-rx.service';
import {UtilService} from '../../../../core/classes/utils.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {catchError, filter, map} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {MovieService} from '../../../../core/classes/movie.service';
import {globalAnimation} from '../../../../core/animations/global.animation';

@UntilDestroy()
@Component({
  selector: 'app-item-container',
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.scss'],
  animations: [globalAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContainerComponent implements OnInit {
  public isFavorite: boolean;
  public isLogged: boolean;
  @Input() data: IItemBasicOmdb;

  constructor(private _matDialog: MatDialog,
              private _cdr: ChangeDetectorRef,
              private _handleUtils: UtilService,
              private _movieService: MovieService,
              @Inject(NGRX_USER_SERVICE) private _userService: IUserNgRxService) {
  }

  ngOnInit(): void {
    this._isLogged();
    this._isFavorite();
  }

  public setFavorite() {
    this._userService.setFavorite(this.data?.imdbID).pipe(untilDestroyed(this)).subscribe(data => {
    });
  }

  public openDetails() {
    this._handleUtils.startLoading();
    this._movieService.getItem({i: this.data.imdbID}).pipe(
      catchError(err => of(EMPTY)),
    ).subscribe((data) => {
      if (data) {
        this._matDialog.open(ModalItemDetailsComponent, {
          width: '50vW',
          data
        });
      }
      this._handleUtils.endLoading();
    });
  }

  private _isLogged() {
    this._userService.getIsLogged().pipe(
      untilDestroyed(this),
    ).subscribe(value => {
      this.isLogged = value;
      this._cdr.markForCheck();
    });
  }

  private _isFavorite() {
    this._userService.getUser().pipe(
      untilDestroyed(this),
      map(data =>
        !!data?.favorites?.find(f => this.data?.imdbID === f)
      )).subscribe(value => {
      this.isFavorite = value;
      this._cdr.markForCheck();
    });
  }
}
