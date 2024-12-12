import {
  Component,
  OnDestroy,
  Input,
  ElementRef,
  AfterViewInit,
  output,
  booleanAttribute,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerParserPipe } from '../../pipes/ngx-mat-timepicker-parser.pipe';
import { NgxMatTimepickerTimeLocalizerPipe } from '../../pipes/ngx-mat-timepicker-time-localizer.pipe';
import { NgxMatTimepickerAutofocusDirective } from '../../directives/ngx-mat-timepicker-autofocus.directive';
import { isDigit } from '../../utils/ngx-mat-timepicker.utils';

function retainSelection(this: HTMLInputElement) {
  this.selectionStart = this.selectionEnd;
}

@Component({
  selector: 'ngx-mat-timepicker-dial-control',
  templateUrl: 'ngx-mat-timepicker-dial-control.component.html',
  styleUrls: ['ngx-mat-timepicker-dial-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxMatTimepickerParserPipe],
  imports: [
    FormsModule,
    NgxMatTimepickerAutofocusDirective,
    NgxMatTimepickerParserPipe,
    NgxMatTimepickerTimeLocalizerPipe,
  ],
})
export class NgxMatTimepickerDialControlComponent
  implements AfterViewInit, OnDestroy
{
  private get _selectedTime(): NgxMatTimepickerClockFace | undefined {
    if (this.time) {
      return this.timeList().find((t) => t.time === +this.time);
    }

    return undefined;
  }

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly isActive = input(false, { transform: booleanAttribute });
  readonly isEditable = input(false, { transform: booleanAttribute });

  readonly minutesGap = input(1);
  readonly timeList = input<NgxMatTimepickerClockFace[]>([]);

  previousTime: number | string;

  @Input() time: string;

  @Input() timeUnit: NgxMatTimepickerUnits;

  readonly timeChanged = output<NgxMatTimepickerClockFace>();
  readonly timeUnitChanged = output<NgxMatTimepickerUnits>();
  readonly focused = output<void>();
  readonly unfocused = output<void>();

  private readonly _elRef = inject(ElementRef);
  private readonly _timeParserPipe = inject(NgxMatTimepickerParserPipe);

  focusChanged(value: boolean) {
    if (value) {
      this.focused.emit();
    } else {
      this.unfocused.emit();
    }
  }

  changeTimeByKeyboard(e: KeyboardEvent): void {
    const char = String.fromCharCode(e.keyCode);

    if (isTimeDisabledToChange(this.time, char, this.timeList())) {
      e.preventDefault();
    }
  }

  ngAfterViewInit(): void {
    this._elRef.nativeElement
      .querySelector('input')
      .addEventListener('select', retainSelection, false);
  }

  ngOnDestroy(): void {
    this._elRef.nativeElement
      ?.querySelector('input')
      ?.removeEventListener('select', retainSelection);
  }

  onKeydown(e: KeyboardEvent): void {
    if (!isDigit(e)) {
      e.preventDefault();
    } else {
      this._changeTimeByArrow(e.keyCode);
    }
  }

  onModelChange(value: string): void {
    this.time = this._timeParserPipe.transform(value, this.timeUnit);
  }

  saveTimeAndChangeTimeUnit(
    event: FocusEvent,
    unit: NgxMatTimepickerUnits,
  ): void {
    event.preventDefault();
    this.previousTime = this.time;
    this.timeUnitChanged.emit(unit);

    this.focusChanged(true);
  }

  updateTime(): void {
    if (this._selectedTime) {
      this.timeChanged.emit(this._selectedTime);
      this.previousTime = this._selectedTime.time;
    }
  }

  private _addTime(amount: number): string {
    return `${+this.time + amount}`.padStart(2, '0');
  }

  private _changeTimeByArrow(keyCode: number): void {
    let time: string;

    // arrow up
    if (keyCode === 38) {
      time = this._addTime(this.minutesGap() || 1);
    }
    // arrow down
    else if (keyCode === 40) {
      time = this._addTime(-1 * (this.minutesGap() || 1));
    }

    if (!isTimeUnavailable(time, this.timeList())) {
      this.time = time;
      this.updateTime();
    }
  }
}

function isTimeDisabledToChange(
  currentTime: string,
  nextTime: string,
  timeList: NgxMatTimepickerClockFace[],
): boolean | undefined {
  const isNumber = /\d/.test(nextTime);

  if (isNumber) {
    const time = currentTime + nextTime;

    return isTimeUnavailable(time, timeList);
  }

  return undefined;
}

function isTimeUnavailable(
  time: string,
  timeList: NgxMatTimepickerClockFace[],
): boolean {
  const selectedTime = timeList.find((value) => value.time === +time);

  return !selectedTime || (selectedTime && selectedTime.disabled);
}
