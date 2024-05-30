import { Directive, computed, input, model, output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DateTime } from 'luxon';

import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { getHours } from '../../utils/ngx-mat-timepicker.utils';

@Directive({
  selector: '[ngxMatTimepickerHoursFace]',
  standalone: true,
})
export class NgxMatTimepickerHoursFaceDirective {
  readonly color = input<ThemePalette>('primary');

  readonly format = model<NgxMatTimepickerFormatType>(24);
  readonly availableHours = computed(() => {
    return getHours(this.format());
  });
  readonly hoursList = computed(() => {
    return this.computeHoursList();
  });

  readonly maxTime = input<DateTime>();
  readonly minTime = input<DateTime>();
  readonly selectedHour = input<NgxMatTimepickerClockFace>();

  readonly hourChange = output<NgxMatTimepickerClockFace>();
  readonly hourSelected = output<number>();

  timeUnit = NgxMatTimepickerUnits;

  onTimeSelected(time: number): void {
    this.hourSelected.emit(time);
  }

  protected computeHoursList(): NgxMatTimepickerClockFace[] {
    return this.availableHours();
  }
}
