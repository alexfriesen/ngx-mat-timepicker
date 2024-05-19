import { TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { NgxMatTimepickerClockFace } from '../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerService } from './ngx-mat-timepicker.service';
import { NgxMatTimepickerPeriods } from '../models/ngx-mat-timepicker-periods.enum';
import { NgxMatTimepickerAdapter } from './ngx-mat-timepicker-adapter';

describe('NgxMatTimepickerService', () => {
  const DEFAULT_HOUR: NgxMatTimepickerClockFace = {
    time: 12,
    angle: 360,
  };
  const DEFAULT_MINUTE: NgxMatTimepickerClockFace = {
    time: 0,
    angle: 360,
  };

  let timepickerService: NgxMatTimepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxMatTimepickerService],
    });

    timepickerService = TestBed.inject(NgxMatTimepickerService);
  });

  it('should set default hour on startup', () => {
    expect(timepickerService.hour()).toEqual(DEFAULT_HOUR);
  });

  it('should set default minute on startup', () => {
    expect(timepickerService.minute()).toEqual(DEFAULT_MINUTE);
  });

  it('should set default period on startup', () => {
    expect(timepickerService.period()).toEqual(NgxMatTimepickerPeriods.AM);
  });

  it('should change hour, minute and period', () => {
    const changedHour: NgxMatTimepickerClockFace = { time: 11, angle: 20 };
    const changedMinute: NgxMatTimepickerClockFace = { time: 40, angle: 50 };

    timepickerService.setHour(changedHour);
    timepickerService.setMinute(changedMinute);
    timepickerService.setPeriod(NgxMatTimepickerPeriods.PM);

    expect(timepickerService.hour()).toEqual(changedHour);
    expect(timepickerService.minute()).toEqual(changedMinute);
    expect(timepickerService.period()).toEqual(NgxMatTimepickerPeriods.PM);
  });

  it('should return default full time as string (hh:mm a or HH:mm)', () => {
    expect(timepickerService.getFullTime(12)).toBe('12:00 AM');
    expect(timepickerService.getFullTime(24)).toBe('12:00');
  });

  it('should return default full time if time is not valid', () => {
    timepickerService.setHour({ angle: 0, time: null });
    timepickerService.setMinute({ angle: 0, time: null });
    expect(timepickerService.getFullTime(12)).toBe('12:00 AM');
    expect(timepickerService.getFullTime(24)).toBe('12:00');
  });

  it('should change default time', () => {
    let time = '11:15 am';
    timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);

    expect(timepickerService.hour()).toEqual({ ...DEFAULT_HOUR, time: 11 });
    expect(timepickerService.minute()).toEqual({ ...DEFAULT_MINUTE, time: 15 });
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);

    time = '11:12 pm';
    timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
    expect(timepickerService.hour().time).toBe(11);
    expect(timepickerService.minute().time).toBe(12);
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.PM);

    time = '12:00 pm';
    timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
    expect(timepickerService.hour().time).toBe(12);
    expect(timepickerService.minute().time).toBe(0);
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.PM);

    time = '12:00 am';
    timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
    expect(timepickerService.hour().time).toBe(12);
    expect(timepickerService.minute().time).toBe(0);
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);

    time = '00:00';
    timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

    expect(timepickerService.hour()).toEqual({ ...DEFAULT_HOUR, time: 0 });
    expect(timepickerService.minute()).toEqual({ ...DEFAULT_MINUTE, time: 0 });
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);

    time = '15:00';
    timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

    expect(timepickerService.hour()).toEqual({ ...DEFAULT_HOUR, time: 15 });
    expect(timepickerService.minute()).toEqual({ ...DEFAULT_MINUTE, time: 0 });
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);
  });

  it('should reset time if default time is invalid', () => {
    timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

    expect(timepickerService.hour()).toEqual({ ...DEFAULT_HOUR, time: 10 });
    expect(timepickerService.minute()).toEqual({ ...DEFAULT_MINUTE, time: 10 });
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);

    timepickerService.setDefaultTimeIfAvailable('invalid time', null, null, 12);

    expect(timepickerService.hour()).toEqual(DEFAULT_HOUR);
    expect(timepickerService.minute()).toEqual(DEFAULT_MINUTE);
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);
  });

  it('should not change time if it is not available', () => {
    const min = DateTime.fromObject({ hour: 11 });

    timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

    expect(timepickerService.hour()).toEqual({ ...DEFAULT_HOUR, time: 10 });
    expect(timepickerService.minute()).toEqual({ ...DEFAULT_MINUTE, time: 10 });
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);

    timepickerService.setDefaultTimeIfAvailable('09:15 am', min, null, 12);

    expect(timepickerService.hour()).toEqual({ ...DEFAULT_HOUR, time: 10 });
    expect(timepickerService.minute()).toEqual({ ...DEFAULT_MINUTE, time: 10 });
    expect(timepickerService.period()).toBe(NgxMatTimepickerPeriods.AM);
  });

  it('should call console error', () => {
    const minutesGap = 5;
    const locale = 'en-US';
    const min = NgxMatTimepickerAdapter.parseTime('11:00 pm', { locale });
    const max = NgxMatTimepickerAdapter.parseTime('11:50 pm', { locale });
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);

    timepickerService.setDefaultTimeIfAvailable(
      '11:43 pm',
      min,
      max,
      12,
      minutesGap,
    );
    expect(spy).toHaveBeenCalled();
  });
});
