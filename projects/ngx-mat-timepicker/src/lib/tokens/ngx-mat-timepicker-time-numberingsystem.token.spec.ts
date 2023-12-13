import { Injector } from '@angular/core';

import { NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM } from './ngx-mat-timepicker-time-numberingsystem.token';

describe('TimeNumberingsystemToken', () => {
  it('should return provided numberingsystem', () => {
    const numberingsystem = 'latn';
    const injector = Injector.create({
      providers: [
        {
          provide: NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM,
          useValue: numberingsystem,
        },
      ],
    });
    const actual = injector.get(NGX_MAT_TIMEPICKER_NUMBERINGSYSTEM);

    expect(actual).toBe(numberingsystem);
  });
});
