import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateTime } from 'luxon';

import { NgxMatTimepickerPeriodComponent } from './ngx-mat-timepicker-period.component';
import { NgxMatTimepickerUnits } from '../../models/ngx-mat-timepicker-units.enum';
import { NgxMatTimepickerPeriods } from '../../models/ngx-mat-timepicker-periods.enum';
import { getHours, getMinutes } from '../../utils/ngx-mat-timepicker.utils';

describe('NgxMatTimepickerPeriodComponent', () => {
  let fixture: ComponentFixture<NgxMatTimepickerPeriodComponent>;
  let component: NgxMatTimepickerPeriodComponent;
  const minutes = getMinutes();

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [OverlayModule, NgxMatTimepickerPeriodComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(NgxMatTimepickerPeriodComponent);

    component = fixture.componentInstance;
  });

  it('should change period for hour unit', () => {
    fixture.componentRef.setInput('activeTimeUnit', NgxMatTimepickerUnits.HOUR);
    fixture.componentRef.setInput('format', 12);
    fixture.componentRef.setInput('minTime', DateTime.fromObject({ hour: 1 }));
    fixture.componentRef.setInput('maxTime', DateTime.fromObject({ hour: 15 }));
    fixture.componentRef.setInput('hours', getHours(12));

    component.periodChanged.subscribe((p) =>
      fixture.componentRef.setInput('selectedPeriod', p),
    );
    component.changePeriod(NgxMatTimepickerPeriods.PM);

    expect(component.isPeriodAvailable()).toBeTruthy();
    expect(component.selectedPeriod()).toBe(NgxMatTimepickerPeriods.PM);
  });

  it('should change period for minute unit', () => {
    fixture.componentRef.setInput(
      'activeTimeUnit',
      NgxMatTimepickerUnits.MINUTE,
    );
    fixture.componentRef.setInput('format', 12);
    fixture.componentRef.setInput('minTime', DateTime.fromObject({ hour: 1 }));
    fixture.componentRef.setInput('maxTime', DateTime.fromObject({ hour: 5 }));
    fixture.componentRef.setInput('minutes', minutes);
    fixture.componentRef.setInput('selectedHour', 4);

    component.periodChanged.subscribe((p) =>
      fixture.componentRef.setInput('selectedPeriod', p),
    );
    component.changePeriod(NgxMatTimepickerPeriods.AM);

    expect(component.selectedPeriod()).toBe(NgxMatTimepickerPeriods.AM);
  });

  it('should not change period', () => {
    fixture.componentRef.setInput(
      'activeTimeUnit',
      NgxMatTimepickerUnits.MINUTE,
    );
    fixture.componentRef.setInput('format', 12);
    fixture.componentRef.setInput('minTime', DateTime.fromObject({ hour: 1 }));
    fixture.componentRef.setInput('maxTime', DateTime.fromObject({ hour: 5 }));
    fixture.componentRef.setInput('minutes', minutes);
    fixture.componentRef.setInput('selectedHour', 4);
    fixture.componentRef.setInput('selectedPeriod', NgxMatTimepickerPeriods.AM);

    component.periodChanged.subscribe((p) =>
      fixture.componentRef.setInput('selectedPeriod', p),
    );
    component.changePeriod(NgxMatTimepickerPeriods.PM);

    expect(component.selectedPeriod()).toBe(NgxMatTimepickerPeriods.AM);
  });

  it('should throw an error', () => {
    fixture.componentRef.setInput('format', 12);
    fixture.componentRef.setInput('minTime', DateTime.fromObject({ hour: 1 }));
    fixture.componentRef.setInput('maxTime', DateTime.fromObject({ hour: 5 }));
    fixture.componentRef.setInput('minutes', minutes);
    fixture.componentRef.setInput('selectedHour', 4);
    fixture.componentRef.setInput('selectedPeriod', NgxMatTimepickerPeriods.AM);

    try {
      component.changePeriod(NgxMatTimepickerPeriods.PM);
    } catch (e: unknown) {
      expect((e as Error).message).toBe('no such NgxMatTimepickerUnits');
    }
  });
});
