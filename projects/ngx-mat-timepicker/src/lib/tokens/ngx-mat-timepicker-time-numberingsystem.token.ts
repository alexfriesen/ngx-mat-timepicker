import { InjectionToken } from '@angular/core';
import type { NumberingSystem } from 'luxon';
import { NgxMatTimepickerAdapter } from '../services/ngx-mat-timepicker-adapter';

export const NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM =
  new InjectionToken<NumberingSystem>('TIMEPICKER_NUMBERINGSYSTEM', {
    providedIn: 'root',
    factory: () => NgxMatTimepickerAdapter.defaultNumberingSystem,
  });
