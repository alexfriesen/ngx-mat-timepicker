import { DateTime } from 'luxon';

import { NgxMatTimepickerClockFace } from '../models/ngx-mat-timepicker-clock-face.interface';
import { NgxMatTimepickerAdapter } from '../services/ngx-mat-timepicker-adapter';
import { NgxMatTimepickerFormat } from '../models/ngx-mat-timepicker-format.enum';
import { NgxMatTimepickerDisabledConfig } from '../models/ngx-mat-timepicker-disabled-config.interface';

const HOURS_24 = [
  {
    time: 1,
    angle: 30,
  },
  {
    time: 2,
    angle: 60,
  },
  {
    time: 3,
    angle: 90,
  },
  {
    time: 4,
    angle: 120,
  },
  {
    time: 5,
    angle: 150,
  },
  {
    time: 6,
    angle: 180,
  },
  {
    time: 7,
    angle: 210,
  },
  {
    time: 8,
    angle: 240,
  },
  {
    time: 9,
    angle: 270,
  },
  {
    time: 10,
    angle: 300,
  },
  {
    time: 11,
    angle: 330,
  },
  {
    time: 0,
    angle: 360,
  },
  {
    time: 13,
    angle: 390,
  },
  {
    time: 14,
    angle: 420,
  },
  {
    time: 15,
    angle: 450,
  },
  {
    time: 16,
    angle: 480,
  },
  {
    time: 17,
    angle: 510,
  },
  {
    time: 18,
    angle: 540,
  },
  {
    time: 19,
    angle: 570,
  },
  {
    time: 20,
    angle: 600,
  },
  {
    time: 21,
    angle: 630,
  },
  {
    time: 22,
    angle: 660,
  },
  {
    time: 23,
    angle: 690,
  },
  {
    time: 12,
    angle: 720,
  },
];

const HOURS_12 = [
  {
    time: 1,
    angle: 30,
  },
  {
    time: 2,
    angle: 60,
  },
  {
    time: 3,
    angle: 90,
  },
  {
    time: 4,
    angle: 120,
  },
  {
    time: 5,
    angle: 150,
  },
  {
    time: 6,
    angle: 180,
  },
  {
    time: 7,
    angle: 210,
  },
  {
    time: 8,
    angle: 240,
  },
  {
    time: 9,
    angle: 270,
  },
  {
    time: 10,
    angle: 300,
  },
  {
    time: 11,
    angle: 330,
  },
  {
    time: 12,
    angle: 360,
  },
];

export function disableHours(
  hours: NgxMatTimepickerClockFace[],
  config: NgxMatTimepickerDisabledConfig,
): NgxMatTimepickerClockFace[] {
  if (config.min || config.max) {
    return hours.map((value) => {
      const hour = NgxMatTimepickerAdapter.isTwentyFour(config.format)
        ? value.time
        : NgxMatTimepickerAdapter.formatHour(
            value.time,
            config.format,
            config.period,
          );
      const currentTime = DateTime.fromObject({ hour }).toFormat(
        NgxMatTimepickerFormat.TWELVE,
      );

      return {
        ...value,
        disabled: !NgxMatTimepickerAdapter.isTimeAvailable(
          currentTime,
          config.min,
          config.max,
          'hour',
        ),
      };
    });
  }

  return hours;
}

export function disableMinutes(
  minutes: NgxMatTimepickerClockFace[],
  selectedHour: number,
  config: NgxMatTimepickerDisabledConfig,
) {
  if (config.min || config.max) {
    const hour = NgxMatTimepickerAdapter.formatHour(
      selectedHour,
      config.format,
      config.period,
    );
    let currentTime = DateTime.fromObject({
      hour,
      minute: 0,
    });

    return minutes.map((value) => {
      currentTime = currentTime.set({ minute: value.time });

      return {
        ...value,
        disabled: !NgxMatTimepickerAdapter.isTimeAvailable(
          currentTime.toFormat(NgxMatTimepickerFormat.TWELVE),
          config.min,
          config.max,
          'minute',
        ),
      };
    });
  }

  return minutes;
}

export function getHours(format: number): NgxMatTimepickerClockFace[] {
  if (format === 24) {
    return HOURS_24;
  }
  return HOURS_12;
}

export function getMinutes(gap = 1): NgxMatTimepickerClockFace[] {
  const minutesCount = 60;
  const angleStep = 360 / minutesCount;
  const minutes = [];

  for (let i = 0; i < minutesCount; i++) {
    const angle = angleStep * i;
    if (i % gap === 0) {
      minutes.push({
        time: i,
        angle: angle !== 0 ? angle : 360,
      });
    }
  }

  return minutes;
}

export function isDigit(e: KeyboardEvent) {
  // Allow: backspace, delete, tab, escape, enter
  if (
    [46, 8, 9, 27, 13].some((n) => n === e.keyCode) ||
    // Allow: Ctrl/cmd+A
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+C
    (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+X
    (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right, up, down
    (e.keyCode >= 35 && e.keyCode <= 40)
  ) {
    return true;
  }

  // Allow: 0-9
  return !(
    (e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  );
}

export const NgxMatTimepickerUtils = {
  disableHours,
  disableMinutes,
  getHours,
  getMinutes,
  isDigit,
};
