import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { DateTime, Info } from 'luxon';

import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerLocaleService } from '../../services/ngx-mat-timepicker-locale.service';
import { NgxMatTimepickerUtils } from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerPeriodComponent } from '../ngx-mat-timepicker-period/ngx-mat-timepicker-period.component';
import { NgxMatTimepickerDialControlComponent } from '../ngx-mat-timepicker-dial-control/ngx-mat-timepicker-dial-control.component';

@Component({
  selector: 'ngx-mat-timepicker-dial',
  templateUrl: 'ngx-mat-timepicker-dial.component.html',
  styleUrls: ['ngx-mat-timepicker-dial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgxMatTimepickerDialControlComponent,
    NgxMatTimepickerPeriodComponent,
  ],
})
export class NgxMatTimepickerDialComponent implements OnChanges {
  @Input() activeTimeUnit: NgxMatTimepickerUnits;

  readonly color = input<ThemePalette>('primary');

  get hourString() {
    return `${this.hour}`;
  }

  get minuteString() {
    return `${this.minute}`;
  }

  private get _locale(): string {
    return this._localeSrv.locale;
  }

  @Input() editableHintTmpl: TemplateRef<Node>;
  @Input() format: NgxMatTimepickerFormatType;
  @Input() hour: number | string;

  hours: NgxMatTimepickerClockFace[];
  @Input() hoursOnly: boolean;
  @Input() isEditable: boolean;

  isHintVisible: boolean;
  @Input() maxTime: DateTime;
  meridiems = Info.meridiems({ locale: this._locale });
  @Input() minTime: DateTime;
  @Input() minute: number | string;
  minutes: NgxMatTimepickerClockFace[];
  @Input() minutesGap: number;
  @Input() period: NgxMatTimepickerPeriods;

  timeUnit = NgxMatTimepickerUnits;

  readonly hourChanged = output<NgxMatTimepickerClockFace>();
  readonly minuteChanged = output<NgxMatTimepickerClockFace>();
  readonly periodChanged = output<NgxMatTimepickerPeriods>();
  readonly timeUnitChanged = output<NgxMatTimepickerUnits>();

  constructor(private _localeSrv: NgxMatTimepickerLocaleService) {}

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
    this.isHintVisible = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    const periodChanged = changes['period'] && changes['period'].currentValue;

    if (
      periodChanged ||
      (changes['format'] && changes['format'].currentValue)
    ) {
      const hours = NgxMatTimepickerUtils.getHours(this.format);

      this.hours = NgxMatTimepickerUtils.disableHours(hours, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period,
      });
    }

    if (periodChanged || (changes['hour'] && changes['hour'].currentValue)) {
      const minutes = NgxMatTimepickerUtils.getMinutes(this.minutesGap);

      this.minutes = NgxMatTimepickerUtils.disableMinutes(minutes, +this.hour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period,
      });
    }
  }

  showHint(): void {
    this.isHintVisible = true;
  }
}
