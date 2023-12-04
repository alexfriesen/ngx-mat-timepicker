import { DateTime } from 'luxon';

import { NgxMatTimepickerAdapter } from './ngx-mat-timepicker-adapter';
import { NgxMatTimepickerPeriods } from '../models/ngx-mat-timepicker-periods.enum';

describe('NgxMatTimepickerAdapter', () => {
  describe('formatHour', () => {
    it('should format hour according to time format (12 or 24)', () => {
      expect(
        NgxMatTimepickerAdapter.formatHour(1, 12, NgxMatTimepickerPeriods.AM),
      ).toBe(1);
      expect(
        NgxMatTimepickerAdapter.formatHour(1, 12, NgxMatTimepickerPeriods.PM),
      ).toBe(13);
      expect(
        NgxMatTimepickerAdapter.formatHour(12, 12, NgxMatTimepickerPeriods.AM),
      ).toBe(0);
      expect(
        NgxMatTimepickerAdapter.formatHour(12, 12, NgxMatTimepickerPeriods.PM),
      ).toBe(12);
      expect(
        NgxMatTimepickerAdapter.formatHour(12, 24, NgxMatTimepickerPeriods.AM),
      ).toBe(12);
      expect(
        NgxMatTimepickerAdapter.formatHour(12, 24, NgxMatTimepickerPeriods.PM),
      ).toBe(12);
      expect(
        NgxMatTimepickerAdapter.formatHour(13, 12, NgxMatTimepickerPeriods.AM),
      ).toBe(0);
      expect(
        NgxMatTimepickerAdapter.formatHour(13, 12, NgxMatTimepickerPeriods.PM),
      ).toBe(12);
      expect(
        NgxMatTimepickerAdapter.formatHour(23, 12, NgxMatTimepickerPeriods.AM),
      ).toBe(0);
      expect(
        NgxMatTimepickerAdapter.formatHour(23, 12, NgxMatTimepickerPeriods.PM),
      ).toBe(12);
      expect(
        NgxMatTimepickerAdapter.formatHour(24, 12, NgxMatTimepickerPeriods.AM),
      ).toBe(0);
      expect(
        NgxMatTimepickerAdapter.formatHour(24, 12, NgxMatTimepickerPeriods.PM),
      ).toBe(12);
    });
  });

  describe('formatTime', () => {
    it('should format time', () => {
      expect(NgxMatTimepickerAdapter.formatTime('11:00', { format: 12 })).toBe(
        '11:00 AM',
      );
      expect(NgxMatTimepickerAdapter.formatTime('11:00', { format: 24 })).toBe(
        '11:00',
      );
    });
  });

  describe('fromDateTimeToString', () => {
    it('should format time', () => {
      const time = DateTime.fromObject({ hour: 11, minute: 0 });
      expect(NgxMatTimepickerAdapter.fromDateTimeToString(time, 12)).toBe(
        '11:00 AM',
      );
      expect(NgxMatTimepickerAdapter.fromDateTimeToString(time, 24)).toBe(
        '11:00',
      );
    });
  });

  describe('isBetween', () => {
    it('should check if time is between', () => {
      const time = DateTime.fromObject({ hour: 11, minute: 0 });
      const start = DateTime.fromObject({ hour: 10, minute: 0 });
      const end = DateTime.fromObject({ hour: 12, minute: 0 });
      expect(NgxMatTimepickerAdapter.isBetween(time, start, end)).toBe(true);
    });
  });

  describe('isSameOrAfter', () => {
    it('should check if time is same or after', () => {
      const time = DateTime.fromObject({ hour: 11, minute: 0 });
      const start = DateTime.fromObject({ hour: 10, minute: 0 });
      expect(NgxMatTimepickerAdapter.isSameOrAfter(time, start)).toBe(true);
    });
  });

  describe('isSameOrBefore', () => {
    it('should check if time is same or before', () => {
      const time = DateTime.fromObject({ hour: 11, minute: 0 });
      const end = DateTime.fromObject({ hour: 12, minute: 0 });
      expect(NgxMatTimepickerAdapter.isSameOrBefore(time, end)).toBe(true);
    });
  });

  describe('isTimeAvailable', () => {
    it('should check if time is available', () => {
      const start = DateTime.fromObject({ hour: 10, minute: 0 });
      const end = DateTime.fromObject({ hour: 12, minute: 0 });
      expect(NgxMatTimepickerAdapter.isTimeAvailable('11:00', start, end)).toBe(
        true,
      );
    });
  });

  describe('isTwentyFour', () => {
    it('should check if format is 24', () => {
      expect(NgxMatTimepickerAdapter.isTwentyFour(12)).toBe(false);
      expect(NgxMatTimepickerAdapter.isTwentyFour(24)).toBe(true);
    });
  });

  describe('parseTime', () => {
    it('should parse time', () => {
      const time = DateTime.fromObject(
        { hour: 11, minute: 0 },
        { locale: 'en-US', numberingSystem: 'latn' },
      );
      expect(
        NgxMatTimepickerAdapter.parseTime('11:00', {
          locale: 'en-US',
          numberingSystem: 'latn',
        }),
      ).toEqual(time);
    });
  });

  describe('toLocaleTimeString', () => {
    it('should convert provided time (en-US) to provided locale (ar-AE) in 12-hours format', () => {
      const expected = '١١:١١ ص';
      const actual = '11:11 am';

      expect(
        NgxMatTimepickerAdapter.toLocaleTimeString(actual, {
          locale: 'ar-AE',
          numberingSystem: 'arab',
        }),
      ).toBe(expected);
    });

    it('should convert provided time (en-US) to provided locale (ar-AE) in 24-hours format', () => {
      const expected = '٢١:١١';
      const actual = '21:11';

      expect(
        NgxMatTimepickerAdapter.toLocaleTimeString(actual, {
          locale: 'ar-AE',
          numberingSystem: 'arab',
          format: 24,
        }),
      ).toBe(expected);
    });
  });
});
