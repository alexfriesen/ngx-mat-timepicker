import { ChangeDetectionStrategy, Component } from '@angular/core';

import { disableHours } from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerHoursFaceDirective } from '../ngx-mat-timepicker-hours-face/ngx-mat-timepicker-hours-face.directive';
import { NgxMatTimepickerFaceComponent } from '../ngx-mat-timepicker-face/ngx-mat-timepicker-face.component';

@Component({
  selector: 'ngx-mat-timepicker-24-hours-face',
  templateUrl: 'ngx-mat-timepicker-24-hours-face.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxMatTimepickerFaceComponent],
})
export class NgxMatTimepicker24HoursFaceComponent extends NgxMatTimepickerHoursFaceDirective {
  constructor() {
    super();
    this.format.set(24);
  }

  protected override computeHoursList(): NgxMatTimepickerClockFace[] {
    return disableHours(this.availableHours(), {
      min: this.minTime(),
      max: this.maxTime(),
      format: this.format(),
    });
  }
}
