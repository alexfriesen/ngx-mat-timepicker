import { DateTimeUnit } from 'luxon';

export type DateTimeUnitWithDeprecatedTypes =
  | DateTimeUnit
  | 'hours'
  | 'minutes';

export function fixDateTimeUnit(
  unit: DateTimeUnitWithDeprecatedTypes,
): DateTimeUnit {
  switch (unit) {
    case 'hours':
    case 'minutes':
      printDeprecationWarning(unit);
      return fixUnit(unit);
    default:
      return unit;
  }
}

export function fixUnit(unit: DateTimeUnitWithDeprecatedTypes): DateTimeUnit {
  switch (unit) {
    case 'hours':
      return 'hour';
    case 'minutes':
      return 'minute';
    default:
      return unit;
  }
}

function printDeprecationWarning(unit: DateTimeUnitWithDeprecatedTypes) {
  console.warn(`'${unit}' is deprecated. Use '${fixUnit(unit)}' instead.`);
}
