import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

import { NgxMatTimepickerUnits } from '../models/ngx-mat-timepicker-units.enum';

@Pipe({
  name: 'timeFormatter',
  standalone: true,
})
export class NgxMatTimepickerTimeFormatterPipe implements PipeTransform {
  transform(
    time: number | string,
    timeUnit: NgxMatTimepickerUnits,
  ): string | number {
    if (time == null || time === '') {
      return time;
    }
    switch (timeUnit) {
      case NgxMatTimepickerUnits.HOUR:
        return DateTime.fromObject({ hour: +time }).toFormat('HH');
      case NgxMatTimepickerUnits.MINUTE:
        return DateTime.fromObject({ minute: +time }).toFormat('mm');
      default:
        throw new Error('no such time unit');
    }
  }
}
