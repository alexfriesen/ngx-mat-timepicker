import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { DateTime } from 'luxon';

import { NgxMatTimepickerClockFace } from '../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerPeriods } from '../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerAdapter } from './ngx-mat-timepicker-adapter';

const DEFAULT_HOUR: NgxMatTimepickerClockFace = {
  time: 12,
  angle: 360,
};
const DEFAULT_MINUTE: NgxMatTimepickerClockFace = {
  time: 0,
  angle: 360,
};

@Injectable({
  providedIn: 'root',
})
export class NgxMatTimepickerService {
  setHour(hour: NgxMatTimepickerClockFace) {
    this.hour$.next(hour);
  }

  setMinute(minute: NgxMatTimepickerClockFace) {
    this.minute$.next(minute);
  }

  setPeriod(period: NgxMatTimepickerPeriods) {
    const isPeriodValid =
      period === NgxMatTimepickerPeriods.AM ||
      period === NgxMatTimepickerPeriods.PM;

    if (isPeriodValid) {
      this.period$.next(period);
    }
  }

  readonly hour$ = new BehaviorSubject<NgxMatTimepickerClockFace>(DEFAULT_HOUR);
  readonly minute$ = new BehaviorSubject<NgxMatTimepickerClockFace>(
    DEFAULT_MINUTE,
  );
  readonly period$ = new BehaviorSubject<NgxMatTimepickerPeriods>(
    NgxMatTimepickerPeriods.AM,
  );

  readonly hour = toSignal(this.hour$);
  readonly minute = toSignal(this.minute$);
  readonly period = toSignal(this.period$);

  getFullTime(format: number): string {
    const selectedHour = this.hour().time;
    const selectedMinute = this.minute().time;
    const hour = selectedHour != null ? selectedHour : DEFAULT_HOUR.time;
    const minute =
      selectedMinute != null ? selectedMinute : DEFAULT_MINUTE.time;
    const period = format === 12 ? this.period() : '';
    const time = `${hour}:${minute} ${period}`.trim();

    return NgxMatTimepickerAdapter.formatTime(time, { format });
  }

  setDefaultTimeIfAvailable(
    time: string,
    min: DateTime,
    max: DateTime,
    format: number,
    minutesGap?: number,
  ) {
    if (!time) {
      this._resetTime();
    }
    /* Workaround to double error message*/
    try {
      if (
        NgxMatTimepickerAdapter.isTimeAvailable(
          time,
          min,
          max,
          'minute',
          minutesGap,
        )
      ) {
        this._setDefaultTime(time, format);
      }
    } catch (e) {
      console.error(e);
    }
  }

  private _resetTime(): void {
    this.setHour({ ...DEFAULT_HOUR });
    this.setMinute({ ...DEFAULT_MINUTE });
    this.setPeriod(NgxMatTimepickerPeriods.AM);
  }

  private _setDefaultTime(time: string, format: number) {
    const defaultDto = NgxMatTimepickerAdapter.parseTime(time, { format });

    if (defaultDto.isValid) {
      const period = time.substring(time.length - 2).toUpperCase();
      const hour = defaultDto.hour;

      this.setHour({
        ...DEFAULT_HOUR,
        time: formatHourByPeriod(hour, period as NgxMatTimepickerPeriods),
      });
      this.setMinute({ ...DEFAULT_MINUTE, time: defaultDto.minute });
      this.setPeriod(period as NgxMatTimepickerPeriods);
    } else {
      this._resetTime();
    }
  }
}

/***
 *  Format hour in 24hours format to meridian (AM or PM) format
 */
function formatHourByPeriod(
  hour: number,
  period: NgxMatTimepickerPeriods,
): number {
  switch (period) {
    case NgxMatTimepickerPeriods.AM:
      return hour === 0 ? 12 : hour;
    case NgxMatTimepickerPeriods.PM:
      return hour === 12 ? 12 : hour - 12;
    default:
      return hour;
  }
}
