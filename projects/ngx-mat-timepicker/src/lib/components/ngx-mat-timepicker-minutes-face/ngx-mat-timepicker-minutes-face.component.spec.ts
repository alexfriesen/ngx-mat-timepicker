import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { NgxMatTimepickerMinutesFaceComponent } from './ngx-mat-timepicker-minutes-face.component';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import {
  disableMinutes,
  getMinutes,
} from '../../utils/ngx-mat-timepicker.utils';

describe('NgxMatTimepickerMinutesFaceComponent', () => {
  let fixture: ComponentFixture<NgxMatTimepickerMinutesFaceComponent>;
  let component: NgxMatTimepickerMinutesFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [NgxMatTimepickerMinutesFaceComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(NgxMatTimepickerMinutesFaceComponent);

    component = fixture.componentInstance;
  });

  it('should calculate minutes once period changed', () => {
    const time = DateTime.fromJSDate(new Date());
    const period = NgxMatTimepickerPeriods.PM;

    fixture.componentRef.setInput('minTime', time);
    fixture.componentRef.setInput('maxTime', time);
    fixture.componentRef.setInput('selectedHour', 1);

    expect(component.minutesList()).toStrictEqual(
      disableMinutes(getMinutes(), 1, {
        format: 12,
        min: time,
        max: time,
        period,
      }),
    );
  });
});
