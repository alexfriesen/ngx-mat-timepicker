import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  input,
  output,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DateTime } from 'luxon';

import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerUtils } from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerFaceComponent } from '../ngx-mat-timepicker-face/ngx-mat-timepicker-face.component';

@Component({
  selector: 'ngx-mat-timepicker-minutes-face',
  templateUrl: './ngx-mat-timepicker-minutes-face.component.html',
  standalone: true,
  imports: [NgxMatTimepickerFaceComponent],
})
export class NgxMatTimepickerMinutesFaceComponent implements OnChanges {
  readonly color = input<ThemePalette>('primary');

  @Input() format: NgxMatTimepickerFormatType;
  @Input() maxTime: DateTime;
  @Input() minTime: DateTime;

  readonly minuteChange = output<NgxMatTimepickerClockFace>();
  @Input() minutesGap: number;

  minutesList: NgxMatTimepickerClockFace[] = [];
  @Input() period: NgxMatTimepickerPeriods;
  @Input() selectedHour: number;

  @Input() selectedMinute: NgxMatTimepickerClockFace;
  timeUnit = NgxMatTimepickerUnits;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['period'] && changes['period'].currentValue) {
      const minutes = NgxMatTimepickerUtils.getMinutes(this.minutesGap);
      this.minutesList = NgxMatTimepickerUtils.disableMinutes(
        minutes,
        this.selectedHour,
        {
          min: this.minTime,
          max: this.maxTime,
          format: this.format,
          period: this.period,
        },
      );
    }
  }
}
