import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

import { NgxMatTimepickerBaseDirective } from '../../directives/ngx-mat-timepicker-base.directive';
import { NgxMatTimepickerConfig } from '../../models/ngx-mat-timepicker-config.interface';
import { NgxMatTimepickerLocaleService } from '../../services/ngx-mat-timepicker-locale.service';
import { NgxMatTimepickerService } from '../../services/ngx-mat-timepicker.service';
import { NgxMatTimepickerEventService } from '../../services/ngx-mat-timepicker-event.service';
import { NgxMatTimepickerMinutesFaceComponent } from '../ngx-mat-timepicker-minutes-face/ngx-mat-timepicker-minutes-face.component';
import { NgxMatTimepicker12HoursFaceComponent } from '../ngx-mat-timepicker-12-hours-face/ngx-mat-timepicker-12-hours-face.component';
import { NgxMatTimepicker24HoursFaceComponent } from '../ngx-mat-timepicker-24-hours-face/ngx-mat-timepicker-24-hours-face.component';
import { NgxMatTimepickerDialComponent } from '../ngx-mat-timepicker-dial/ngx-mat-timepicker-dial.component';
import { NgxMatTimepickerContentComponent } from '../ngx-mat-timepicker-content/ngx-mat-timepicker-content.component';

@Component({
  selector: 'ngx-mat-timepicker-dialog',
  styleUrls: ['./ngx-mat-timepicker-dialog.component.scss'],
  templateUrl: './ngx-mat-timepicker-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    AsyncPipe,
    // Common
    NgTemplateOutlet,
    // Material
    MatButton,
    MatToolbar,
    // NgxMatTimepicker
    NgxMatTimepickerContentComponent,
    NgxMatTimepickerDialComponent,
    NgxMatTimepicker24HoursFaceComponent,
    NgxMatTimepicker12HoursFaceComponent,
    NgxMatTimepickerMinutesFaceComponent,
  ],
})
export class NgxMatTimepickerDialogComponent extends NgxMatTimepickerBaseDirective {
  constructor(
    @Inject(MAT_DIALOG_DATA) public override data: NgxMatTimepickerConfig,
    protected _dialogRef: MatDialogRef<NgxMatTimepickerDialogComponent>,
    timepickerSrv: NgxMatTimepickerService,
    eventSrv: NgxMatTimepickerEventService,
    timepickerLocaleSrv: NgxMatTimepickerLocaleService,
  ) {
    super(timepickerSrv, eventSrv, timepickerLocaleSrv, data);
  }

  override close(): void {
    this._dialogRef.close();
  }
}
