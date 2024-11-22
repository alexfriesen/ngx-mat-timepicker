import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  booleanAttribute,
  input,
  output,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ThemePalette, MatOption } from '@angular/material/core';
import { FloatLabelType, MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { NgxMatTimepickerLocaleService } from '../../services/ngx-mat-timepicker-locale.service';
import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NgxMatTimepickerService } from '../../services/ngx-mat-timepicker.service';
import { NgxMatTimepickerClockFace } from '../../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerAdapter } from '../../services/ngx-mat-timepicker-adapter';
import { NgxMatTimepickerUtils } from '../../utils/ngx-mat-timepicker.utils';
import { NgxMatTimepickerComponent } from '../ngx-mat-timepicker/ngx-mat-timepicker.component';
import { NgxMatTimepickerToggleIconDirective } from '../../directives/ngx-mat-timepicker-toggle-icon.directive';
import { NgxMatTimepickerToggleComponent } from '../ngx-mat-timepicker-toggle/ngx-mat-timepicker-toggle.component';
import { NgxMatTimepickerControlComponent } from '../ngx-mat-timepicker-control/ngx-mat-timepicker-control.component';

@Component({
  selector: 'ngx-mat-timepicker-field',
  templateUrl: './ngx-mat-timepicker-field.component.html',
  styleUrls: ['./ngx-mat-timepicker-field.component.scss'],
  providers: [
    NgxMatTimepickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgxMatTimepickerFieldComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    FormsModule,
    MatFormField,
    MatSelect,
    MatIcon,
    MatOption,
    NgxMatTimepickerControlComponent,
    NgxMatTimepickerToggleComponent,
    NgxMatTimepickerToggleIconDirective,
    NgxMatTimepickerComponent,
  ],
})
export class NgxMatTimepickerFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  readonly color = input<ThemePalette>('primary');

  get defaultTime(): string {
    return this._defaultTime;
  }

  @Input()
  set defaultTime(val: string) {
    this._defaultTime = val;
    this._isDefaultTime = !!val;
  }

  readonly floatLabel = input<FloatLabelType>('auto');

  get format(): NgxMatTimepickerFormatType {
    return this._format;
  }

  @Input()
  set format(value: NgxMatTimepickerFormatType) {
    if (NgxMatTimepickerAdapter.isTwentyFour(value)) {
      this._format = 24;
      this.minHour = 0;
      this.maxHour = 23;
    } else {
      this._format = 12;
      this.minHour = 1;
      this.maxHour = 12;
    }
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
    const isDynamicallyChanged =
      value && this._previousFormat && this._previousFormat !== this._format;

    if (isDynamicallyChanged) {
      this._updateTime(this.timepickerTime);
    }
    this._previousFormat = this._format;
  }

  get max(): DateTime {
    return this._max;
  }

  @Input()
  set max(value: string | DateTime) {
    if (typeof value === 'string') {
      this._max = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format,
      });

      return;
    }
    this._max = value;
  }

  get min(): DateTime {
    return this._min;
  }

  @Input()
  set min(value: string | DateTime) {
    if (typeof value === 'string') {
      this._min = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format,
      });

      return;
    }
    this._min = value;
  }

  private get _locale(): string {
    return this._timepickerLocaleSrv.locale;
  }

  @Input() cancelBtnTmpl: TemplateRef<Node>;

  @Input() confirmBtnTmpl: TemplateRef<Node>;

  @Input({ transform: booleanAttribute }) controlOnly: boolean;

  @Input({ transform: booleanAttribute }) disabled: boolean;

  readonly hour = signal<NgxMatTimepickerClockFace>(undefined);
  readonly hour$ = toObservable(this.hour);

  hoursList: NgxMatTimepickerClockFace[];
  isChangePeriodDisabled: boolean;
  isTimeRangeSet: boolean;
  maxHour = 12;
  minHour = 1;

  readonly minute = signal<NgxMatTimepickerClockFace>(undefined);
  readonly minute$ = toObservable(this.minute);

  minutesList: NgxMatTimepickerClockFace[];
  period: NgxMatTimepickerPeriods = NgxMatTimepickerPeriods.AM;
  periods: NgxMatTimepickerPeriods[] = [
    NgxMatTimepickerPeriods.AM,
    NgxMatTimepickerPeriods.PM,
  ];

  readonly timeChanged = output<string>();
  timepickerTime: string;

  timeUnit = NgxMatTimepickerUnits;
  @Input() toggleIcon: TemplateRef<HTMLObjectElement>;

  private _defaultTime: string;
  private _format: NgxMatTimepickerFormatType = 12;
  private _isDefaultTime: boolean;
  private _isFirstTimeChange = true;
  private _max: DateTime;
  private _min: DateTime;
  private _previousFormat: number;
  private _selectedHour: number;
  private _subsCtrl$: Subject<void> = new Subject<void>();

  constructor(
    private _timepickerService: NgxMatTimepickerService,
    private _timepickerLocaleSrv: NgxMatTimepickerLocaleService,
  ) {}

  changeHour(hour: number): void {
    this._timepickerService.setHour(
      this.hoursList.find((h) => h.time === hour),
    );
    this._changeTime();
  }

  changeMinute(minute: number): void {
    this._timepickerService.setMinute(
      this.minutesList.find((m) => m.time === minute),
    );
    this._changeTime();
  }

  changePeriod(value: NgxMatTimepickerPeriods): void {
    this._timepickerService.setPeriod(value);
    this._changeTime();
  }

  ngOnDestroy(): void {
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }

  ngOnInit() {
    this._initTime(this.defaultTime);

    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
    this.minutesList = NgxMatTimepickerUtils.getMinutes();
    this.isTimeRangeSet = !!(this.min || this.max);

    this._timepickerService.hour$
      .pipe(
        tap(
          (clockTime: NgxMatTimepickerClockFace) =>
            (this._selectedHour = clockTime?.time),
        ),
        map(this._changeDefaultTimeValue.bind(this)),
        tap(() => this.isTimeRangeSet && this._updateAvailableMinutes()),
      )
      .subscribe({
        next: (v: NgxMatTimepickerClockFace) => this.hour.set(v),
      });
    this._timepickerService.minute$
      .pipe(
        map(this._changeDefaultTimeValue.bind(this)),
        tap(() => (this._isFirstTimeChange = false)),
      )
      .subscribe({
        next: (v: NgxMatTimepickerClockFace) => this.minute.set(v),
      });

    if (this.format === 12) {
      this._timepickerService.period$
        .pipe(
          distinctUntilChanged<NgxMatTimepickerPeriods>(),
          tap((period: NgxMatTimepickerPeriods) => (this.period = period)),
          tap(
            (period) =>
              (this.isChangePeriodDisabled = this._isPeriodDisabled(period)),
          ),
          takeUntil(this._subsCtrl$),
        )
        .subscribe(() => this.isTimeRangeSet && this._updateAvailableTime());
    }
  }

  onTimeSet(time: string): void {
    this._updateTime(time);
    this._emitLocalTimeChange(time);
  }

  registerOnChange(fn: (time: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: string): void {
    if (val) {
      this._initTime(val);
    } else {
      this._resetTime();
    }
  }

  private _changeDefaultTimeValue(
    clockFaceTime: NgxMatTimepickerClockFace,
  ): NgxMatTimepickerClockFace {
    if (!this._isDefaultTime && this._isFirstTimeChange) {
      return { ...clockFaceTime, time: null };
    }

    return clockFaceTime;
  }

  private _changeTime(): void {
    if (!isNaN(this.hour()?.time) && !isNaN(this.minute()?.time)) {
      const time = this._timepickerService.getFullTime(this.format);
      this.timepickerTime = time;
      this._emitLocalTimeChange(time);
    }
  }

  private _emitLocalTimeChange(time: string): void {
    const localTime = NgxMatTimepickerAdapter.toLocaleTimeString(time, {
      format: this.format,
      locale: this._locale,
    });

    this._onChange(localTime);
    this._onTouched(localTime);
    this.timeChanged.emit(localTime);
  }

  private _initTime(time: string): void {
    const isDefaultTimeAvailable = NgxMatTimepickerAdapter.isTimeAvailable(
      time,
      this.min as DateTime,
      this.max as DateTime,
      'minute',
      null,
      this.format,
    );
    if (!isDefaultTimeAvailable) {
      if (this.min) {
        this._updateTime(
          NgxMatTimepickerAdapter.fromDateTimeToString(
            this.min as DateTime,
            this.format,
          ),
        );

        return;
      }
      if (this.max) {
        this._updateTime(
          NgxMatTimepickerAdapter.fromDateTimeToString(
            this.max as DateTime,
            this.format,
          ),
        );

        return;
      }
    }
    this._updateTime(time);
  }

  private _isPeriodDisabled(period: NgxMatTimepickerPeriods): boolean {
    return NgxMatTimepickerUtils.disableHours(
      NgxMatTimepickerUtils.getHours(12),
      {
        min: this.min as DateTime,
        max: this.max as DateTime,
        format: 12,
        period:
          period === NgxMatTimepickerPeriods.AM
            ? NgxMatTimepickerPeriods.PM
            : NgxMatTimepickerPeriods.AM,
      },
    ).every((time) => time.disabled);
  }

  private _onChange: (value: string) => void = () => {
    // ignore
  };
  private _onTouched: (value: string) => void = () => {
    // ignore
  };

  private _resetTime(): void {
    this._timepickerService.setHour({ angle: 0, time: null });
    this._timepickerService.setMinute({ angle: 0, time: null });
  }

  private _updateAvailableHours(): void {
    this.hoursList = NgxMatTimepickerUtils.disableHours(this.hoursList, {
      min: this.min as DateTime,
      max: this.max as DateTime,
      format: this.format,
      period: this.period,
    });
  }

  private _updateAvailableMinutes(): void {
    this.minutesList = NgxMatTimepickerUtils.disableMinutes(
      this.minutesList,
      this._selectedHour,
      {
        min: this.min as DateTime,
        max: this.max as DateTime,
        format: this.format,
        period: this.period,
      },
    );
  }

  private _updateAvailableTime(): void {
    this._updateAvailableHours();
    if (this._selectedHour) {
      this._updateAvailableMinutes();
    }
  }

  private _updateTime(time: string): void {
    if (time) {
      const formattedTime = NgxMatTimepickerAdapter.formatTime(time, {
        locale: this._locale,
        format: this.format,
      });
      this._timepickerService.setDefaultTimeIfAvailable(
        formattedTime,
        this.min as DateTime,
        this.max as DateTime,
        this.format,
      );
      this.timepickerTime = formattedTime;
    }
  }
}
