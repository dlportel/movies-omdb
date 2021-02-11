import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';


// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    dateA11yLabel: 'LL',
  },
};

@Component({
  selector: 'app-datepicker-year',
  templateUrl: './datepicker-year.component.html',
  styleUrls: ['./datepicker-year.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerYearComponent implements OnInit {
  public date = new FormControl(moment());
  public maxDate: Date;
  @Output() yearSelected: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input()
  set maxYear(value: number) {
    const momentValue = moment().set('y', value);
    this.maxDate = momentValue.toDate();
  }

  @Input()
  set initYear(value: number) {
    const momentValue = moment().set('y', value);
    this.date.setValue(momentValue);
  }

  public chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value;
    if (ctrlValue) {
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    } else {
      this.date.setValue(normalizedYear);
    }
    this.yearSelected.emit(this.date.value.year());
    datepicker.close();
  }
}
