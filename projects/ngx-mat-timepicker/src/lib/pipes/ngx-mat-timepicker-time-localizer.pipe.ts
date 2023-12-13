import { Pipe, PipeTransform, inject } from '@angular/core';
import { DateTime } from 'luxon';

import { NgxMatTimepickerUnits } from '../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerMeasure } from '../models/ngx-mat-timepicker-measures.enum';
import { NgxMatTimepickerLocaleService } from '../services/ngx-mat-timepicker-locale.service';

@Pipe({
  name: 'timeLocalizer',
  standalone: true,
})
export class NgxMatTimepickerTimeLocalizerPipe implements PipeTransform {
  private readonly _timepickerLocaleSrv = inject(NgxMatTimepickerLocaleService);

  private get _locale(): string {
    return this._timepickerLocaleSrv.locale;
  }

  private get _numberingSystem() {
    return this._timepickerLocaleSrv.numberingSystem;
  }

  transform(
    time: number | string,
    timeUnit: NgxMatTimepickerUnits,
    isKeyboardEnabled = false,
  ): string {
    if (time == null || time === '') {
      return '';
    }

    switch (timeUnit) {
      case NgxMatTimepickerUnits.HOUR: {
        const format = time === 0 || isKeyboardEnabled ? 'HH' : 'H';

        return this._formatTime(NgxMatTimepickerMeasure.hour, time, format);
      }
      case NgxMatTimepickerUnits.MINUTE:
        return this._formatTime(NgxMatTimepickerMeasure.minute, time, 'mm');
      default:
        throw new Error(`There is no Time Unit with type ${timeUnit}`);
    }
  }

  private _formatTime(
    timeMeasure: NgxMatTimepickerMeasure,
    time: string | number,
    format: string,
  ): string {
    try {
      return DateTime.fromObject({ [timeMeasure]: +time })
        .reconfigure({
          locale: this._locale,
          numberingSystem: this._numberingSystem,
        })
        .toFormat(format);
    } catch {
      throw new Error(
        `Cannot format provided time - ${time} to locale - ${this._locale}`,
      );
    }
  }
}
