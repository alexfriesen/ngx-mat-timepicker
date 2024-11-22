import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { DateTime, Info } from 'luxon';

import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerLocaleService } from '../../services/ngx-mat-timepicker-locale.service';
import {
  disableHours,
  disableMinutes,
  getHours,
  getMinutes,
} from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerPeriodComponent } from '../ngx-mat-timepicker-period/ngx-mat-timepicker-period.component';
import { NgxMatTimepickerDialControlComponent } from '../ngx-mat-timepicker-dial-control/ngx-mat-timepicker-dial-control.component';

@Component({
  selector: 'ngx-mat-timepicker-dial',
  templateUrl: 'ngx-mat-timepicker-dial.component.html',
  styleUrls: ['ngx-mat-timepicker-dial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    NgxMatTimepickerDialControlComponent,
    NgxMatTimepickerPeriodComponent,
  ]
})
export class NgxMatTimepickerDialComponent {
  private locale = inject(NgxMatTimepickerLocaleService).locale;

  meridiems = Info.meridiems({ locale: this.locale });
  timeUnit = NgxMatTimepickerUnits;

  readonly color = input<ThemePalette>('primary');

  readonly editableHintTmpl = input<TemplateRef<Node>>();
  readonly format = input<NgxMatTimepickerFormatType>();
  readonly hour = input<number | string>();
  readonly minute = input<number | string>();
  readonly minutesGap = input<number>();
  readonly period = input<NgxMatTimepickerPeriods>();
  readonly activeTimeUnit = input<NgxMatTimepickerUnits>();

  readonly hoursOnly = input<boolean>();
  readonly isEditable = input<boolean>();

  readonly maxTime = input<DateTime>();
  readonly minTime = input<DateTime>();

  readonly isHintVisible = signal(false);

  readonly hourString = computed(() => `${this.hour()}`);
  readonly minuteString = computed(() => `${this.minute()}`);

  readonly hours = computed(() => {
    const hours = getHours(this.format());
    return disableHours(hours, {
      min: this.minTime(),
      max: this.maxTime(),
      format: this.format(),
      period: this.period(),
    });
  });
  readonly minutes = computed(() => {
    const minutes = getMinutes(this.minutesGap());
    return disableMinutes(minutes, +this.hour(), {
      min: this.minTime(),
      max: this.maxTime(),
      format: this.format(),
      period: this.period(),
    });
  });

  readonly hourChanged = output<NgxMatTimepickerClockFace>();
  readonly minuteChanged = output<NgxMatTimepickerClockFace>();
  readonly periodChanged = output<NgxMatTimepickerPeriods>();
  readonly timeUnitChanged = output<NgxMatTimepickerUnits>();

  changeHour(hour: NgxMatTimepickerClockFace): void {
    this.hourChanged.emit(hour);
  }

  changeMinute(minute: NgxMatTimepickerClockFace): void {
    this.minuteChanged.emit(minute);
  }

  changePeriod(period: NgxMatTimepickerPeriods): void {
    this.periodChanged.emit(period);
  }

  changeTimeUnit(unit: NgxMatTimepickerUnits): void {
    this.timeUnitChanged.emit(unit);
  }

  hideHint(): void {
    this.isHintVisible.set(false);
  }

  showHint(): void {
    this.isHintVisible.set(true);
  }
}
