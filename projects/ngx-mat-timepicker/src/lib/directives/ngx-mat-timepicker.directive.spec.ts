import { Component, DebugElement, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxMatTimepickerModule } from '../ngx-mat-timepicker.module';
import { NgxMatTimepickerDirective } from './ngx-mat-timepicker.directive';
import { NgxMatTimepickerComponent } from '../components/ngx-mat-timepicker/ngx-mat-timepicker.component';

import { DateTime } from 'luxon';

@Component({
  template: `
    <input [ngxMatTimepicker]="picker" />
    <ngx-mat-timepicker #picker />
  `,
  standalone: true,
  imports: [NgxMatTimepickerModule],
})
class TestComponent {}

describe('NgxMatTimepickerDirective', () => {
  const consoleWarnValue = "Selected time doesn't match min or max value";
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;
  let directive: NgxMatTimepickerDirective;
  let timepickerComponent: NgxMatTimepickerComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [NgxMatTimepickerModule, TestComponent],
    }).createComponent(TestComponent);
    input = fixture.debugElement.query(By.directive(NgxMatTimepickerDirective));
    directive = input.injector.get<NgxMatTimepickerDirective>(
      NgxMatTimepickerDirective,
    );
    timepickerComponent = TestBed.createComponent(
      NgxMatTimepickerComponent,
    ).componentInstance;
  });

  it('should register NgxMatTimepickerComponent', () => {
    const spy = jest.spyOn(directive, 'timepicker', 'set');
    directive.timepicker = timepickerComponent;
    expect(spy).toHaveBeenCalledWith(timepickerComponent);
  });

  it('should throw Error if NgxMatTimepickerComponent is not defined', () => {
    jest.spyOn(directive, 'timepicker', 'set');
    expect((): void => (directive.timepicker = null)).toThrowError(
      'NgxMatTimepickerComponent is not defined.' +
        ' Please make sure you passed the timepicker to ngxMatTimepicker directive',
    );
  });

  describe('Format', () => {
    it('should set 12 format', () => {
      directive.format = 25;
      expect(directive.format).toBe(12);
    });

    it('should set 24 format', () => {
      directive.format = 24;
      expect(directive.format).toBe(24);
    });

    it('should set value and call updateTime  when format changes dynamically', () => {
      const spy = jest.spyOn(timepickerComponent, 'updateTime');
      directive.timepicker = timepickerComponent;
      directive.value = '11:11 pm';
      directive.format = 12;

      expect(directive.value.toLowerCase()).toBe('11:11 pm');
      expect(spy).toHaveBeenCalledTimes(0);

      directive.format = 24;

      expect(directive.value).toBe('23:11');
      expect(spy).toHaveBeenCalledWith('23:11');
    });

    it('should not call updateTime when format the same as before', () => {
      const spy = jest.spyOn(timepickerComponent, 'updateTime');
      directive.timepicker = timepickerComponent;
      directive.format = 12;

      expect(spy).toHaveBeenCalledTimes(0);

      directive.format = 12;

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  it('should return min time in DateTime type if pass string', () => {
    directive.min = '11:00 pm';
    expect((directive.min as unknown as DateTime).hour).toBe(23);
    expect((directive.min as unknown as DateTime).minute).toBe(0);
  });

  it('should return min time in DateTime type if pass DateTime', () => {
    directive.min = DateTime.fromObject({ hour: 10, minute: 11 });
    expect(directive.min.hour).toBe(10);
    expect(directive.min.minute).toBe(11);
  });

  it('should return max time in DateTime type if pass string', () => {
    directive.max = '11:00 pm';
    expect((directive.max as unknown as DateTime).hour).toBe(23);
    expect((directive.max as unknown as DateTime).minute).toBe(0);
  });

  it('should return max time in DateTime type if pass DateTime', () => {
    directive.max = DateTime.fromObject({ hour: 10, minute: 11 });
    expect(directive.max.hour).toBe(10);
    expect(directive.max.minute).toBe(11);
  });

  it(`should clear the time if set value undefined, null, '' `, () => {
    directive.value = undefined;
    expect(directive.value).toBe('');
    directive.value = null;
    expect(directive.value).toBe('');
    directive.value = '';
    expect(directive.value).toBe('');
  });

  it('should return formatted time', () => {
    directive.timepicker = timepickerComponent;
    directive.value = '11:00';
    expect(directive.value).toBe('11:00 AM');
  });

  it('should call console.warn if time is not between min and max(inclusively) value', () => {
    directive.timepicker = timepickerComponent;
    const spy = jest.spyOn(console, 'warn');

    directive.min = '11:00 am';
    directive.value = '10:00 am';
    expect(spy).toHaveBeenCalledWith(consoleWarnValue);

    directive.max = '11:30 am';
    directive.value = '11:35 am';
    directive.value = '11:20 am';

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should change value and default time on timeSet output', () => {
    const time = '12:12 PM';
    directive.timepicker = timepickerComponent;
    timepickerComponent.timeSet.next(time);
    expect(directive.value).toBe(time);
    expect(timepickerComponent.defaultTime).toBe(time);
  });

  it('should change time onChange', () => {
    expect(directive.value).toBe('');
    directive.timepicker = timepickerComponent;

    directive.element.value = '11:12';
    directive.element.dispatchEvent(new CustomEvent('change'));

    expect(directive.value).toBe('11:12 AM');
  });

  it('should set invalid datetime if time is in inappropriate format', () => {
    directive.timepicker = timepickerComponent;
    directive.value = 'test';
    expect(directive.value).toBe('Invalid DateTime');
  });

  it('should set default time if binding value changes', () => {
    const changes: SimpleChanges = {
      value: {
        currentValue: '10:00 am',
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => null,
      },
    };

    directive.timepicker = timepickerComponent;
    directive.ngOnChanges(changes);
    expect(timepickerComponent.defaultTime).toBe('10:00 AM');
  });

  it('should not set default time if binding value does not change ', () => {
    const changes: SimpleChanges = {
      min: {
        currentValue: '11:00',
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => null,
      },
    };
    directive.timepicker = timepickerComponent;

    directive.ngOnChanges(changes);
    expect(timepickerComponent.defaultTime).toBeUndefined();
  });

  it('should open timepicker on click', () => {
    const spy = jest.spyOn(timepickerComponent, 'open');
    directive.timepicker = timepickerComponent;

    directive.onClick({ stopPropagation: () => null } as MouseEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should not open timepicker on click if disableClick is true', () => {
    const spy = jest.spyOn(timepickerComponent, 'open');
    directive.timepicker = timepickerComponent;
    directive.disableClick = true;

    directive.onClick({ stopPropagation: () => null } as MouseEvent);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should update time and default time on writeValue function', () => {
    const time = '11:11 AM';
    directive.timepicker = timepickerComponent;

    directive.writeValue(time);
    expect(directive.value).toBe(time);
    expect(timepickerComponent.defaultTime).toBe(time);
  });

  it('should not change default time when writeValue called with undefined', () => {
    directive.timepicker = timepickerComponent;

    directive.writeValue(undefined);
    expect(directive.value).toBe('');
    expect(timepickerComponent.defaultTime).toBeUndefined();
  });

  it('should set onChange function on registerOnChange', () => {
    const spy = jest.fn();
    directive.timepicker = timepickerComponent;
    directive.registerOnChange(spy);

    directive.element.value = '11:12 am';
    directive.element.dispatchEvent(new CustomEvent('change'));

    expect(spy).toHaveBeenCalledWith('11:12 AM');
  });

  it('should set onTouch function on registerOnTouched', () => {
    const spy = jest.spyOn(console, 'log');

    directive.registerOnTouched(console.log);
    directive.onTouched();

    expect(spy).toHaveBeenCalled();
  });

  it('should change disabled state on setDisabledState', () => {
    expect(directive.disabled).toBeFalsy();
    directive.setDisabledState(true);
    expect(directive.disabled).toBeTruthy();
  });

  describe('element getter', () => {
    it('should return current HTMLInputElement', () => {
      expect(directive.element).toEqual(input.nativeElement);
    });
  });
});
