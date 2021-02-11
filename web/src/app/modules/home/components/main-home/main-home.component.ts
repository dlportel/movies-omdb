import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MovieService} from '../../../../core/classes/movie.service';
import {IItemBasicOmdb, ISearchOmdb, SearchOmdb} from '../../../../core/models/omdb-item.model';
import {FiltersParent} from '../../../../core/classes/filters.parent';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {combineLatest, EMPTY, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {Helpers} from '../../../../core/utils/helpers';
import {UtilService} from '../../../../core/classes/utils.service';
import {MatDialog} from '@angular/material/dialog';
import {globalAnimation} from '../../../../core/animations/global.animation';

@UntilDestroy()
@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations: [globalAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHomeComponent extends FiltersParent implements OnInit {
  public maxYear: number;
  public initYear = 2020;
  public itemsStorage: IItemBasicOmdb[] = [];

  constructor(private _movieService: MovieService,
              private _handleUtils: UtilService,
              private _matDialog: MatDialog,
              _cdr: ChangeDetectorRef) {
    super(_cdr);
  }

  ngOnInit(): void {
    this.maxYear = new Date().getFullYear();
    this.searchByTextControl.patchValue('Cielo', {emitEvent: true});
    this._text$.next(this.searchByTextControl.value);
    this._params$.next(new SearchOmdb({y: String(this.initYear)}));
    this._getItems();
  }

  public chosenYear(value: number) {
    this._setParamsValue('y', String(value));
  }

  public trackByFn(index: number, item: IItemBasicOmdb) {
    try {
      return item.imdbID;
    } catch (e) {
    }
  }

  private _getItems() {
    combineLatest([this._params$, this._paginator$, this._text$]).pipe(
      untilDestroyed(this),
      switchMap(([params, paginator, text]) => {
        this._handleUtils.startLoading();
        const search = new SearchOmdb({...params, s: text});
        return this._movieService.getItems(Helpers.removeNulls<ISearchOmdb>(search));
      }),
      catchError(error => {
        return of(EMPTY);
      })
    ).subscribe((data) => {
      this._handleUtils.endLoading();
      if ('docs' in data && 'total' in data) {
        this.itemsStorage = data.docs;
        this.itemsAmount = data.total;
        this._cdr.markForCheck();
      }
    });
  }

}
