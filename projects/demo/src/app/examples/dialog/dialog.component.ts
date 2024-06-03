import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import {
  NgxMatTimepickerComponent,
  NgxMatTimepickerDirective,
} from '@alexfriesen/ngx-mat-timepicker';

@Component({
  selector: 'app-example-dialog-inner',
  template: `
    <div mat-dialog-title>Dialog Title</div>
    <div mat-dialog-content>
      <mat-form-field class="time-input-width">
        <mat-label>Time</mat-label>
        <input
          matInput
          #foo="matInput"
          name="selected_time_a"
          [format]="24"
          [(ngModel)]="date"
          [ngxMatTimepicker]="pickerA"
          readonly
        />
        <mat-icon matSuffix (click)="pickerA.open()">watch_later </mat-icon>
      </mat-form-field>
      <p>FIELD FOCUSED: {{ foo.focused }}</p>
      <ngx-mat-timepicker appendToInput="true" #pickerA></ngx-mat-timepicker>
    </div>
  `,
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatIcon,
    NgxMatTimepickerDirective,
    NgxMatTimepickerComponent,
  ],
})
export class NgxMatTimepickerTestDialogComponent {
  date = '2:00';
}

@Component({
  selector: 'app-example-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
  standalone: true,
  imports: [MatButton],
})
export class ExampleDialogComponent {
  private readonly matDialog = inject(MatDialog);

  time = '00:00';

  openDialog() {
    this.matDialog.open(NgxMatTimepickerTestDialogComponent, {
      width: '300px',
    });
  }
}
