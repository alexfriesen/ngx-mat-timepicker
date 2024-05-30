import { Component, computed, input, output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DateTime } from 'luxon';

import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import {
  getMinutes,
  disableMinutes,
} from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerFaceComponent } from '../ngx-mat-timepicker-face/ngx-mat-timepicker-face.component';

@Component({
  selector: 'ngx-mat-timepicker-minutes-face',
  templateUrl: './ngx-mat-timepicker-minutes-face.component.html',
  standalone: true,
  imports: [NgxMatTimepickerFaceComponent],
})
export class NgxMatTimepickerMinutesFaceComponent {
  readonly color = input<ThemePalette>('primary');

  readonly format = input<NgxMatTimepickerFormatType>();
  readonly maxTime = input<DateTime>();
  readonly minTime = input<DateTime>();

  readonly minuteChange = output<NgxMatTimepickerClockFace>();
  readonly minutesGap = input<number>();

  readonly minutesList = computed(() => {
    const minutes = getMinutes(this.minutesGap());
    return disableMinutes(minutes, this.selectedHour(), {
      min: this.minTime(),
      max: this.maxTime(),
      format: this.format(),
      period: this.period(),
    });
  });
  readonly period = input<NgxMatTimepickerPeriods>();
  readonly selectedHour = input<number>();

  readonly selectedMinute = input<NgxMatTimepickerClockFace>();
  timeUnit = NgxMatTimepickerUnits;
}
