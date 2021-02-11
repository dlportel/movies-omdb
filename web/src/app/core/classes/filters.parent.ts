import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, skip} from 'rxjs/operators';
import {ChangeDetectorRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {IPaginator, Paginator} from '../models/paginator.model';

@UntilDestroy()
export abstract class FiltersParent {
  public searchByTextControl: FormControl;
  public itemsAmount = 0;
  protected _params$: BehaviorSubject<any>;
  protected _text$: BehaviorSubject<string>;
  protected _paginator$: BehaviorSubject<IPaginator>;

  protected constructor(protected _cdr: ChangeDetectorRef) {
    this._params$ = new BehaviorSubject({});
    this._text$ = new BehaviorSubject(null);
    this._paginator$ = new BehaviorSubject(new Paginator());
    this.searchByTextControl = new FormControl();
    this.searchByTextControl.valueChanges.pipe(untilDestroyed(this), skip(1), debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this._nexText(value);
    });
  }

  public changePaginator($event: PageEvent) {
    const paginator = new Paginator({
      start: $event.pageIndex * $event.pageSize,
      end: $event.pageIndex * $event.pageSize + $event.pageSize
    });
    this._paginator$.next(paginator);
  }

  protected _nexText(value: string) {
    this._text$.next(value);
  }

  protected _setParamsValue(attribute: string, value: any) {
    const params = this._params$.getValue();
    params[attribute] = value;
    this._params$.next(params);
  }
}
