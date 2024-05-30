import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateTime } from 'luxon';

import { NgxMatTimepicker12HoursFaceComponent } from './ngx-mat-timepicker-12-hours-face.component';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { disableHours, getHours } from '../../utils/ngx-mat-timepicker.utils';

describe('NgxMatTimepicker12HoursFaceComponent', () => {
  let fixture: ComponentFixture<NgxMatTimepicker12HoursFaceComponent>;
  let component: NgxMatTimepicker12HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [NgxMatTimepicker12HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(NgxMatTimepicker12HoursFaceComponent);

    component = fixture.componentInstance;
  });

  it('should callculate hours once period changed', () => {
    const time = DateTime.fromJSDate(new Date());
    const format = 12;
    const period = NgxMatTimepickerPeriods.PM;

    fixture.componentRef.setInput('minTime', time);
    fixture.componentRef.setInput('maxTime', time);

    fixture.componentRef.setInput('period', period);

    expect(component.hoursList()).toStrictEqual(
      disableHours(getHours(format), {
        format: 12,
        min: time,
        max: time,
        period,
      }),
    );
  });
});
