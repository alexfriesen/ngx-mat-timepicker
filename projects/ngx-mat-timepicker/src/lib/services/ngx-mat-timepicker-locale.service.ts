import { Injectable, inject } from '@angular/core';
import { DateTime, NumberingSystem } from 'luxon';

import { NGX_MAT_TIMEPICKER_LOCALE } from '../tokens/ngx-mat-timepicker-time-locale.token';
import { NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM } from '../tokens/ngx-mat-timepicker-time-numberingsystem.token';

@Injectable({
  providedIn: 'root',
})
export class NgxMatTimepickerLocaleService {
  get locale(): string {
    return this._locale;
  }

  get numberingSystem(): string {
    return this._numberingSystem;
  }

  private _locale = inject(NGX_MAT_TIMEPICKER_LOCALE);
  private _numberingSystem = inject(NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM);

  updateLocale(newValue: string): void {
    this._locale = newValue;
  }

  updateNumberingSystemByLocale(newValue: string): void {
    this._numberingSystem = this.resolveNumberingSystemByLocale(newValue);
  }

  updateNumberingSystem(newValue: NumberingSystem): void {
    this._numberingSystem = newValue;
  }

  private resolveNumberingSystemByLocale(locale: string): NumberingSystem {
    return DateTime.local().setLocale(locale).resolvedLocaleOptions()
      .numberingSystem;
  }
}
