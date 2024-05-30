import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NgxMatTimepickerDialComponent } from './ngx-mat-timepicker-dial.component';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NGX_MAT_TIMEPICKER_LOCALE } from '../../tokens/ngx-mat-timepicker-time-locale.token';
import { NgxMatTimepickerAdapter } from '../../services/ngx-mat-timepicker-adapter';
import {
  disableHours,
  disableMinutes,
  getHours,
  getMinutes,
} from '../../utils/ngx-mat-timepicker.utils';

describe('NgxMatTimepickerDialComponent', () => {
  let fixture: ComponentFixture<NgxMatTimepickerDialComponent>;
  let component: NgxMatTimepickerDialComponent;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [NgxMatTimepickerDialComponent],
      providers: [
        {
          provide: NGX_MAT_TIMEPICKER_LOCALE,
          useValue: NgxMatTimepickerAdapter.defaultLocale,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(NgxMatTimepickerDialComponent);

    component = fixture.componentInstance;
  });

  it('should calculate hours and minutes on period change', () => {
    fixture.componentRef.setInput('period', NgxMatTimepickerPeriods.AM);

    expect(component.hours()).toStrictEqual(
      disableHours(getHours(component.format()), {
        min: component.minTime(),
        max: component.maxTime(),
        format: component.format(),
        period: component.period(),
      }),
    );
    expect(component.minutes()).toStrictEqual(
      disableMinutes(getMinutes(component.minutesGap()), +component.hour(), {
        min: component.minTime(),
        max: component.maxTime(),
        format: component.format(),
        period: component.period(),
      }),
    );
  });

  it('should calculate hours on format change', () => {
    fixture.componentRef.setInput('format', 24);

    expect(component.hours()).toStrictEqual(
      disableHours(getHours(24), {
        min: component.minTime(),
        max: component.maxTime(),
        format: component.format(),
        period: component.period(),
      }),
    );
  });

  it('should calculate minutes on hour change', () => {
    fixture.componentRef.setInput('hour', 24);

    expect(component.minutes()).toStrictEqual(
      disableMinutes(getMinutes(component.minutesGap()), +component.hour(), {
        min: component.minTime(),
        max: component.maxTime(),
        format: component.format(),
        period: component.period(),
      }),
    );
  });

  it('should emit changed time unit', fakeAsync(() => {
    let timeUnit = null;

    component.timeUnitChanged.subscribe((unit) => (timeUnit = unit));
    component.changeTimeUnit(NgxMatTimepickerUnits.MINUTE);

    expect(timeUnit).toBe(NgxMatTimepickerUnits.MINUTE);
  }));

  it('should emit changed period', fakeAsync(() => {
    let period = NgxMatTimepickerPeriods.AM;

    component.periodChanged.subscribe((p) => (period = p));
    component.changePeriod(NgxMatTimepickerPeriods.PM);

    tick();
    expect(period).toBe(NgxMatTimepickerPeriods.PM);
  }));

  it('should emit changed hour', fakeAsync(() => {
    let hour = { time: 1, angle: 30 };

    component.hourChanged.subscribe((h) => (hour = h));
    component.changeHour({ time: 2, angle: 60 });

    tick();
    expect(hour).toEqual({ time: 2, angle: 60 });
  }));

  it('should emit changed minute', fakeAsync(() => {
    let minute = { time: 10, angle: 30 };

    component.minuteChanged.subscribe((m) => (minute = m));
    component.changeMinute({ time: 20, angle: 60 });

    tick();
    expect(minute).toEqual({ time: 20, angle: 60 });
  }));

  it('should set isHintVisible true', () => {
    expect(component.isHintVisible()).toBeFalsy();

    component.showHint();

    expect(component.isHintVisible()).toBeTruthy();
  });

  it('should set isHintVisible false', () => {
    component.isHintVisible.set(true);

    component.hideHint();

    expect(component.isHintVisible()).toBeFalsy();
  });
});
