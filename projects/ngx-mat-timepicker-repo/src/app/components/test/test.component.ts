import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CodeViewerComponent } from '../code-viewer/code-viewer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
//
import {
  NgxMatTimepickerComponent,
  NgxMatTimepickerDirective,
  NgxMatTimepickerLocaleService,
  NgxMatTimepickerFieldComponent,
} from '@alexfriesen/ngx-mat-timepicker';
//
import { DemoComponent } from '../demo/demo.component';

@Component({
  selector: 'app-dialog',
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgxMatTimepickerDirective,
    MatIconModule,
    NgxMatTimepickerComponent,
  ],
})
export class NgxMatTimepickerTestDialogComponent {
  date: string = '2:00';
}

@Component({
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    CodeViewerComponent,
    NgxMatTimepickerFieldComponent,
  ],
})
export class TestComponent extends DemoComponent {
  formControlItem: FormControl = new FormControl('', [
    Validators.pattern(/([0-9]|[1-2]\d):[0-5]\d/),
  ]);
  time: string = '00:00';
  @ViewChild('timepicker') timepicker: NgxMatTimepickerComponent;

  constructor(
    private _matDialog: MatDialog,
    localeOverrideSrv: NgxMatTimepickerLocaleService,
  ) {
    super(localeOverrideSrv);
  }

  onClear() {
    this.formControlItem.setValue(null);
  }

  onFieldBlur(): void {
    this.formControlItem.valid &&
      this.pickerFreeInput.updateTime(this.formControlItem.value);
  }

  openDialog() {
    this._matDialog.open(NgxMatTimepickerTestDialogComponent, {
      width: '300px',
    });
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }
}
