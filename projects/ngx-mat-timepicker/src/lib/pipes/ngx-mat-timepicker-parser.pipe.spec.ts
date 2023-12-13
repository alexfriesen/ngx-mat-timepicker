import { TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { NgxMatTimepickerUnits } from '../models/ngx-mat-timepicker-units.enum';
import { NGX_MAT_TIMEPICKER_LOCALE } from '../tokens/ngx-mat-timepicker-time-locale.token';
import { NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM } from '../tokens/ngx-mat-timepicker-time-numberingsystem.token';
import { NgxMatTimepickerParserPipe } from './ngx-mat-timepicker-parser.pipe';

describe('NgxMatTimepickerParserPipe', () => {
  let pipe: NgxMatTimepickerParserPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxMatTimepickerParserPipe,
        {
          provide: NGX_MAT_TIMEPICKER_LOCALE,
          useValue: 'ar-AE',
        },
        {
          provide: NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM,
          useValue: 'arab',
        },
      ],
    });
    pipe = TestBed.inject(NgxMatTimepickerParserPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not parse time when provided invalid value', () => {
    const expected = '';

    expect(pipe.transform(undefined, NgxMatTimepickerUnits.HOUR)).toBe(
      expected,
    );
    expect(pipe.transform(null, NgxMatTimepickerUnits.HOUR)).toBe(expected);
    expect(pipe.transform('', NgxMatTimepickerUnits.HOUR)).toBe(expected);
  });

  it('should return unparsed time if number provided', () => {
    const time = 5;

    expect(pipe.transform(time)).toBe(`${time}`);
  });

  it('should parse arabian hour to latin', () => {
    const unparsedHours = Array(24)
      .fill(0)
      .map((v, i) => v + i);

    for (const hour of unparsedHours) {
      const unparsedHour = DateTime.fromObject(
        { hour },
        { numberingSystem: 'arab' },
      ).toFormat('HH');

      expect(pipe.transform(unparsedHour, NgxMatTimepickerUnits.HOUR)).toBe(
        `${hour}`,
      );
    }
  });

  it('should parse arabian minute to latin', () => {
    const unparsedMinutes = Array(59)
      .fill(0)
      .map((v, i) => v + i);

    for (const minute of unparsedMinutes) {
      const unparsedMinute = DateTime.fromObject(
        { minute },
        { numberingSystem: 'arab' },
      ).toFormat('mm');

      expect(pipe.transform(unparsedMinute, NgxMatTimepickerUnits.MINUTE)).toBe(
        `${minute}`,
      );
    }
  });

  it('should throw an error when cannot parse provided time', () => {
    const time = 's3';

    try {
      pipe.transform(time);
    } catch (e: unknown) {
      expect(e instanceof Error).toBeTruthy();
      expect((e as Error).message).toBe(`Cannot parse time - ${time}`);
    }
  });
});
