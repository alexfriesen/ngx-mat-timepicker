import { Component, computed, inject, input, output } from '@angular/core';
import {
  animate,
  sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  ScrollStrategy,
  CdkOverlayOrigin,
  CdkConnectedOverlay,
} from '@angular/cdk/overlay';
import {
  MatButtonToggleGroup,
  MatButtonToggle,
} from '@angular/material/button-toggle';

import { DateTime } from 'luxon';

import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import {
  disableHours,
  disableMinutes,
} from '../../utils/ngx-mat-timepicker.utils';

@Component({
  selector: 'ngx-mat-timepicker-period',
  templateUrl: 'ngx-mat-timepicker-period.component.html',
  styleUrls: ['ngx-mat-timepicker-period.component.scss'],
  animations: [
    trigger('scaleInOut', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('.2s', style({ transform: 'scale(1)' })),
        sequence([
          animate('3s', style({ opacity: 1 })),
          animate('.3s', style({ opacity: 0 })),
        ]),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
})
export class NgxMatTimepickerPeriodComponent {
  protected readonly _overlay = inject(Overlay);

  readonly activeTimeUnit = input<NgxMatTimepickerUnits>();
  readonly format = input<NgxMatTimepickerFormatType>();

  readonly hours = input<NgxMatTimepickerClockFace[]>();
  readonly minutes = input<NgxMatTimepickerClockFace[]>();

  readonly maxTime = input<DateTime>();
  readonly minTime = input<DateTime>();

  readonly meridiems = input<string[]>();
  readonly selectedHour = input<number | string>();
  readonly selectedPeriod = input<NgxMatTimepickerPeriods>();

  readonly periodChanged = output<NgxMatTimepickerPeriods>();

  readonly isAmDisabled = computed(() => {
    const times = this._getDisabledTimeByPeriod(NgxMatTimepickerPeriods.AM);
    return times.every((t) => t.disabled);
  });
  readonly isPmDisabled = computed(() => {
    const times = this._getDisabledTimeByPeriod(NgxMatTimepickerPeriods.PM);
    return times.every((t) => t.disabled);
  });

  readonly isPeriodAvailable = computed(() => {
    const period = this.selectedPeriod();
    if (period === NgxMatTimepickerPeriods.AM) {
      return !this.isAmDisabled();
    }
    if (period === NgxMatTimepickerPeriods.PM) {
      return !this.isPmDisabled();
    }
    return false;
  });

  timePeriod = NgxMatTimepickerPeriods;
  overlayPositionStrategy: FlexibleConnectedPositionStrategy;
  overlayScrollStrategy: ScrollStrategy =
    this._overlay.scrollStrategies.reposition();

  changePeriod(period: NgxMatTimepickerPeriods): void {
    const allowed = this._isSwitchPeriodAvailable(period);
    if (allowed) {
      this.periodChanged.emit(period);
    }
  }

  private _getDisabledTimeByPeriod(
    period: NgxMatTimepickerPeriods,
  ): NgxMatTimepickerClockFace[] {
    switch (this.activeTimeUnit()) {
      case NgxMatTimepickerUnits.HOUR:
        return disableHours(this.hours(), {
          min: this.minTime(),
          max: this.maxTime(),
          format: this.format(),
          period,
        });

      case NgxMatTimepickerUnits.MINUTE:
        return disableMinutes(this.minutes(), +this.selectedHour(), {
          min: this.minTime(),
          max: this.maxTime(),
          format: this.format(),
          period,
        });
      default:
        throw new Error('no such NgxMatTimepickerUnits');
    }
  }

  private _isSwitchPeriodAvailable(period: NgxMatTimepickerPeriods): boolean {
    const time = this._getDisabledTimeByPeriod(period);

    return !time.every((t) => t.disabled);
  }
}
