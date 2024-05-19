import { NgxMatTimepickerFormatType } from './ngx-mat-timepicker-format.type';
import { NgxMatTimepickerPeriods } from './ngx-mat-timepicker-periods.enum';

import type { DateTime } from 'luxon';

export interface NgxMatTimepickerDisabledConfig {
  format: NgxMatTimepickerFormatType;
  max: DateTime;
  min: DateTime;
  period?: NgxMatTimepickerPeriods;
}
