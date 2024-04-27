import {
  Directive,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemePalette } from '@angular/material/core';
import { Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

import { NgxMatTimepickerEventService } from '../services/ngx-mat-timepicker-event.service';
import { NgxMatTimepickerLocaleService } from '../services/ngx-mat-timepicker-locale.service';
import { NgxMatTimepickerService } from '../services/ngx-mat-timepicker.service';
import { NgxMatTimepickerAdapter } from '../services/ngx-mat-timepicker-adapter';

import { NgxMatTimepickerUnits } from '../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerClockFace } from '../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerPeriods } from '../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerConfig } from '../models/ngx-mat-timepicker-config.interface';
import { NGX_MAT_TIMEPICKER_CONFIG } from '../tokens/ngx-mat-timepicker-config.token';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngxMatTimepickerBase]',
  standalone: true,
})
export class NgxMatTimepickerBaseDirective implements OnInit, OnDestroy {
  protected readonly color = model<ThemePalette>('primary');

  get defaultTime(): string {
    return this._defaultTime;
  }

  @Input()
  set defaultTime(time: string) {
    this._defaultTime = time;
    this._setDefaultTime(time);
  }

  private get _locale(): string {
    return this._timepickerLocaleSrv.locale;
  }

  readonly selectedHour$ = this._timepickerSrv.selectedHour.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  readonly selectedHour = toSignal(this.selectedHour$);

  readonly selectedMinute$ = this._timepickerSrv.selectedMinute.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  readonly selectedMinute = toSignal(this.selectedMinute$);

  readonly selectedPeriod$ = this._timepickerSrv.selectedPeriod.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  readonly selectedPeriod = toSignal(this.selectedPeriod$);

  activeTimeUnit: NgxMatTimepickerUnits = NgxMatTimepickerUnits.HOUR;
  timeUnit: typeof NgxMatTimepickerUnits = NgxMatTimepickerUnits;

  protected _defaultTime: string;
  protected _subsCtrl$: Subject<void> = new Subject<void>();

  constructor(
    protected _timepickerSrv: NgxMatTimepickerService,
    protected _eventSrv: NgxMatTimepickerEventService,
    protected _timepickerLocaleSrv: NgxMatTimepickerLocaleService,
    @Inject(NGX_MAT_TIMEPICKER_CONFIG) public data: NgxMatTimepickerConfig,
  ) {
    this.color.set(data.color);
    this.defaultTime = data.defaultTime;
  }

  changePeriod(period: NgxMatTimepickerPeriods): void {
    this._timepickerSrv.period = period;
    this._onTimeChange();
  }

  changeTimeUnit(unit: NgxMatTimepickerUnits): void {
    this.activeTimeUnit = unit;
  }

  close(): void {
    this.data.timepickerBaseRef.close();
  }

  ngOnDestroy(): void {
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }

  ngOnInit(): void {
    this._defineTime();

    this.data.timepickerBaseRef.timeUpdated
      .pipe(takeUntil(this._subsCtrl$))
      .subscribe({
        next: (v: string) => {
          v && this._setDefaultTime(v);
        },
      });
  }

  onHourChange(hour: NgxMatTimepickerClockFace): void {
    this._timepickerSrv.hour = hour;
    this._onTimeChange();
  }

  onHourSelected(hour: number): void {
    if (!this.data.hoursOnly) {
      this.changeTimeUnit(NgxMatTimepickerUnits.MINUTE);
    }
    this.data.timepickerBaseRef.hourSelected.emit(hour);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    this._eventSrv.dispatchEvent(e);
    e.stopPropagation();
  }

  onMinuteChange(minute: NgxMatTimepickerClockFace): void {
    this._timepickerSrv.minute = minute;
    this._onTimeChange();
  }

  setTime(): void {
    this.data.timepickerBaseRef.timeSet.emit(
      this._timepickerSrv.getFullTime(this.data.format),
    );
    this.close();
  }

  protected _defineTime(): void {
    const minTime = this.data.minTime;

    if (minTime && !this.data.time && !this.data.defaultTime) {
      const time = NgxMatTimepickerAdapter.fromDateTimeToString(
        minTime,
        this.data.format,
      );

      this._setDefaultTime(time);
    }
  }

  protected _onTimeChange(): void {
    const time = NgxMatTimepickerAdapter.toLocaleTimeString(
      this._timepickerSrv.getFullTime(this.data.format),
      {
        locale: this._locale,
        format: this.data.format,
      },
    );

    this.data.timepickerBaseRef.timeChanged.emit(time);
  }

  protected _setDefaultTime(time: string): void {
    this._timepickerSrv.setDefaultTimeIfAvailable(
      time,
      this.data.minTime,
      this.data.maxTime,
      this.data.format,
      this.data.minutesGap,
    );
  }
}
