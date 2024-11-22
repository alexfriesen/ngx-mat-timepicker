import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { DateTime } from 'luxon';

import {
  NgxMatTimepickerComponent,
  NgxMatTimepickerToggleComponent,
  NgxMatTimepickerFieldComponent,
  NgxMatTimepickerDirective,
} from '@alexfriesen/ngx-mat-timepicker';

@Component({
  selector: 'app-example-append',
  templateUrl: 'append.component.html',
  styleUrls: ['append.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    NgxMatTimepickerDirective,
    NgxMatTimepickerComponent,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerToggleComponent,
  ]
})
export class ExampleAppendComponent {
  maxTime = DateTime.local().startOf('day').set({
    hour: 16,
    minute: 20,
  });

  minTime = this.maxTime.set({ hour: 14 });

  selectedTime: string;
}
