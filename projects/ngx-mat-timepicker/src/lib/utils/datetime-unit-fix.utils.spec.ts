import { fixDateTimeUnit } from './datetime-unit-fix.utils';

describe('fixDateTimeUnit', () => {
  it('should fix unit', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => null);

    expect(fixDateTimeUnit('hours')).toBe('hour');
    expect(fixDateTimeUnit('minutes')).toBe('minute');

    expect(fixDateTimeUnit('hour')).toBe('hour');
    expect(fixDateTimeUnit('minute')).toBe('minute');
  });

  it('should print deprecation warning', () => {
    jest.spyOn(console, 'warn');

    fixDateTimeUnit('hours');
    expect(console.warn).toHaveBeenCalledWith(
      `'hours' is deprecated. Use 'hour' instead.`,
    );

    fixDateTimeUnit('minutes');
    expect(console.warn).toHaveBeenCalledWith(
      `'minutes' is deprecated. Use 'minute' instead.`,
    );
  });
});
