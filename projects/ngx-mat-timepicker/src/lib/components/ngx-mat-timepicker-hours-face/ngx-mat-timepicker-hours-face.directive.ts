import { Directive, Input, input, output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DateTime } from 'luxon';

import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NgxMatTimepickerUtils } from '../../utils/ngx-mat-timepicker.utils';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngxMatTimepickerHoursFace]',
  standalone: true,
})
export class NgxMatTimepickerHoursFaceDirective {
  readonly color = input<ThemePalette>('primary');

  @Input()
  set format(newValue: NgxMatTimepickerFormatType) {
    this._format = newValue;
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
  }

  get format(): NgxMatTimepickerFormatType {
    return this._format;
  }

  readonly hourChange = output<NgxMatTimepickerClockFace>();
  readonly hourSelected = output<number>();

  hoursList: NgxMatTimepickerClockFace[] = [];
  @Input() maxTime: DateTime;
  @Input() minTime: DateTime;
  @Input() selectedHour: NgxMatTimepickerClockFace;

  protected _format: NgxMatTimepickerFormatType = 24;

  constructor() {}

  onTimeSelected(time: number): void {
    this.hourSelected.emit(time);
  }
}
