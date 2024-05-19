import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  booleanAttribute,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ThemePalette } from '@angular/material/core';
import {
  FloatLabelType,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';

import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerParserPipe } from '../../pipes/ngx-mat-timepicker-parser.pipe';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { isDigit } from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerTimeLocalizerPipe } from '../../pipes/ngx-mat-timepicker-time-localizer.pipe';

function concatTime(currentTime: string, nextTime: string): number | undefined {
  const isNumber = /\d/.test(nextTime);

  if (isNumber) {
    const time = currentTime + nextTime;

    return +time;
  }

  return undefined;
}

@Component({
  selector: 'ngx-mat-timepicker-time-control',
  templateUrl: './ngx-mat-timepicker-control.component.html',
  styleUrls: ['./ngx-mat-timepicker-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxMatTimepickerParserPipe],
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInput,
    NgxMatTimepickerParserPipe,
    NgxMatTimepickerTimeLocalizerPipe,
  ],
})
export class NgxMatTimepickerControlComponent implements OnChanges {
  static nextId: number = 0;

  readonly color = input<ThemePalette>('primary');
  readonly floatLabel = input<FloatLabelType>('auto');

  @Input({ transform: booleanAttribute })
  disabled: boolean;

  id: number = NgxMatTimepickerControlComponent.nextId++;
  isFocused: boolean;
  @Input() max: number;
  @Input() min: number;
  @Input() placeholder: string;
  @Input({ transform: booleanAttribute }) preventTyping: boolean;

  @Input() time: number;

  @Input() timeList: NgxMatTimepickerClockFace[];
  @Input() timeUnit: NgxMatTimepickerUnits;

  readonly timeChanged = output<number>();

  private _previousTime: number;

  constructor(private _timeParser: NgxMatTimepickerParserPipe) {}

  changeTime(event: InputEvent): void {
    event.stopPropagation();

    const char = event.data;
    const time = concatTime(String(this.time), char);

    this._changeTimeIfValid(time);
  }

  decrease(): void {
    if (!this.disabled) {
      let previousTime = +this.time - 1;

      if (previousTime < this.min) {
        previousTime = this.max;
      }

      if (this._isSelectedTimeDisabled(previousTime)) {
        previousTime = this._getAvailableTime(
          previousTime,
          this._getPrevAvailableTime.bind(this),
        );
      }

      if (previousTime !== this.time) {
        this.timeChanged.emit(previousTime);
      }
    }
  }

  increase(): void {
    if (!this.disabled) {
      let nextTime = +this.time + 1;

      if (nextTime > this.max) {
        nextTime = this.min;
      }

      if (this._isSelectedTimeDisabled(nextTime)) {
        nextTime = this._getAvailableTime(
          nextTime,
          this._getNextAvailableTime.bind(this),
        );
      }

      if (nextTime !== this.time) {
        this.timeChanged.emit(nextTime);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['timeList'] && this.time != null) {
      if (this._isSelectedTimeDisabled(this.time)) {
        this._setAvailableTime();
      }
    }
  }

  onBlur(): void {
    this.isFocused = false;

    if (this._previousTime !== this.time) {
      this._changeTimeIfValid(+this.time);
    }
  }

  onFocus(): void {
    this.isFocused = true;
    this._previousTime = this.time;
  }

  onKeydown(event: KeyboardEvent): void {
    event.stopPropagation();

    if (!isDigit(event)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowUp':
        this.increase();
        break;
      case 'ArrowDown':
        this.decrease();
        break;
    }

    if (this.preventTyping && event.key !== 'Tab') {
      event.preventDefault();
    }
  }

  onModelChange(value: string): void {
    this.time = +this._timeParser.transform(value, this.timeUnit);
  }

  private _changeTimeIfValid(value: number | undefined): void {
    if (!isNaN(value)) {
      this.time = value;

      if (this.time > this.max) {
        const timeString = String(value);
        this.time = +timeString[timeString.length - 1];
      }

      if (this.time < this.min) {
        this.time = this.min;
      }

      this.timeChanged.emit(this.time);
    }
  }

  private _getAvailableTime(
    currentTime: number,
    fn: (index: number) => number | undefined,
  ): number | undefined {
    const currentTimeIndex = this.timeList.findIndex(
      (time) => time.time === currentTime,
    );
    const availableTime = fn(currentTimeIndex);

    return availableTime != null ? availableTime : this.time;
  }

  private _getNextAvailableTime(index: number): number | undefined {
    const timeCollection = this.timeList;
    const maxValue = timeCollection.length;
    for (let i = index + 1; i < maxValue; i++) {
      const time = timeCollection[i];
      if (!time.disabled) {
        return time.time;
      }
    }

    return undefined;
  }

  private _getPrevAvailableTime(index: number): number | undefined {
    for (let i = index; i >= 0; i--) {
      const time = this.timeList[i];
      if (!time.disabled) {
        return time.time;
      }
    }

    return undefined;
  }

  private _isSelectedTimeDisabled(time: number): boolean {
    return this.timeList.find(
      (faceTime: NgxMatTimepickerClockFace) => faceTime.time === time,
    ).disabled;
  }

  private _setAvailableTime(): void {
    this.time = this.timeList.find((t) => !t.disabled).time;
    this.timeChanged.emit(this.time);
  }
}
