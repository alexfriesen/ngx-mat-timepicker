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
  selector: 'app-example-format-24',
  templateUrl: 'format-24.component.html',
  styleUrls: ['format-24.component.scss'],
  standalone: true,
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
  ],
})
export class ExampleFormat24Component {
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
