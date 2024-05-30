import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateTime } from 'luxon';

import { NgxMatTimepicker24HoursFaceComponent } from './ngx-mat-timepicker-24-hours-face.component';
import { disableHours, getHours } from '../../utils/ngx-mat-timepicker.utils';

describe('NgxMatTimepicker24HoursFaceComponent', () => {
  let fixture: ComponentFixture<NgxMatTimepicker24HoursFaceComponent>;
  let component: NgxMatTimepicker24HoursFaceComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NgxMatTimepicker24HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxMatTimepicker24HoursFaceComponent);
    component = fixture.componentInstance;
  });

  it('should compute correct hours', () => {
    const time = DateTime.fromJSDate(new Date());

    fixture.componentRef.setInput('minTime', time);
    fixture.componentRef.setInput('maxTime', time);

    expect(component.hoursList()).toStrictEqual(
      disableHours(getHours(24), { min: time, max: time, format: 24 }),
    );
  });
});
