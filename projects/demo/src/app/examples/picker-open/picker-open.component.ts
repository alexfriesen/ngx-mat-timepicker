import { Component } from '@angular/core';
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
  selector: 'app-example-picker-open',
  templateUrl: 'picker-open.component.html',
  styleUrls: ['picker-open.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButton,
    MatIcon,
    MatInput,
    NgxMatTimepickerDirective,
    NgxMatTimepickerComponent,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerToggleComponent,
  ]
})
export class ExamplePickerOpenComponent {
  maxTime = DateTime.local().startOf('day').set({
    hour: 16,
    minute: 20,
  });

  minTime = this.maxTime.set({ hour: 14 });

  selectedTime: string;

  timeRegex = /([0-9]|1\d):[0-5]\d (AM|PM)/;

  onTimeSet($event: string): void {
    console.info('TIME UPDATED', $event);
  }
}
