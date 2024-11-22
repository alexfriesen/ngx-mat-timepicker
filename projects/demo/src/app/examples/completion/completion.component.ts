import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DateTime } from 'luxon';

import {
  NgxMatTimepickerComponent,
  NgxMatTimepickerToggleComponent,
  NgxMatTimepickerFieldComponent,
  NgxMatTimepickerDirective,
} from '@alexfriesen/ngx-mat-timepicker';

@Component({
  selector: 'app-example-completion',
  templateUrl: 'completion.component.html',
  styleUrls: ['completion.component.scss'],
  imports: [
    FormsModule,
    MatButton,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    NgxMatTimepickerDirective,
    NgxMatTimepickerComponent,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerToggleComponent,
  ]
})
export class ExampleCompletionComponent {
  maxTime = DateTime.local().startOf('day').set({
    hour: 16,
    minute: 20,
  });

  minTime = this.maxTime.set({ hour: 14 });

  readonly pickerFreeInput = viewChild<NgxMatTimepickerComponent>('pickerH');

  selectedTime: string;

  showInput = true;
  timeRegex = /([0-9]|1\d):[0-5]\d (AM|PM)/;

  selectedTimeFreeInputChanged($event: string): void {
    console.info('TIME CHANGED');
    this.pickerFreeInput().updateTime($event);
  }

  updateTime($event: string, targetProp: string): void {
    console.info('TIME SET', $event);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any)[targetProp] = $event;
  }
}
