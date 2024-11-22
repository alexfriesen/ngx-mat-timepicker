import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { disableHours } from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerHoursFaceDirective } from '../ngx-mat-timepicker-hours-face/ngx-mat-timepicker-hours-face.directive';
import { NgxMatTimepickerFaceComponent } from '../ngx-mat-timepicker-face/ngx-mat-timepicker-face.component';

@Component({
  selector: 'ngx-mat-timepicker-12-hours-face',
  templateUrl: 'ngx-mat-timepicker-12-hours-face.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxMatTimepickerFaceComponent]
})
export class NgxMatTimepicker12HoursFaceComponent extends NgxMatTimepickerHoursFaceDirective {
  readonly period = input<NgxMatTimepickerPeriods>();
  constructor() {
    super();
    this.format.set(12);
  }

  protected override computeHoursList(): NgxMatTimepickerClockFace[] {
    return disableHours(this.availableHours(), {
      min: this.minTime(),
      max: this.maxTime(),
      format: this.format(),
      period: this.period(),
    });
  }
}
