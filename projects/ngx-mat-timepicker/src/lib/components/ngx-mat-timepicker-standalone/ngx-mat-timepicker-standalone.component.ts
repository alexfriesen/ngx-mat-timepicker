import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { A11yModule } from '@angular/cdk/a11y';

import { NGX_MAT_TIMEPICKER_CONFIG } from '../../tokens/ngx-mat-timepicker-config.token';
import { NgxMatTimepickerLocaleService } from '../../services/ngx-mat-timepicker-locale.service';
import { NgxMatTimepickerService } from '../../services/ngx-mat-timepicker.service';
import { NgxMatTimepickerEventService } from '../../services/ngx-mat-timepicker-event.service';
import { NgxMatTimepickerConfig } from '../../models/ngx-mat-timepicker-config.interface';
import { NgxMatTimepickerBaseDirective } from '../../directives/ngx-mat-timepicker-base.directive';
import { NgxMatTimepickerMinutesFaceComponent } from '../ngx-mat-timepicker-minutes-face/ngx-mat-timepicker-minutes-face.component';
import { NgxMatTimepicker12HoursFaceComponent } from '../ngx-mat-timepicker-12-hours-face/ngx-mat-timepicker-12-hours-face.component';
import { NgxMatTimepicker24HoursFaceComponent } from '../ngx-mat-timepicker-24-hours-face/ngx-mat-timepicker-24-hours-face.component';
import { NgxMatTimepickerDialComponent } from '../ngx-mat-timepicker-dial/ngx-mat-timepicker-dial.component';
import { NgxMatTimepickerContentComponent } from '../ngx-mat-timepicker-content/ngx-mat-timepicker-content.component';

@Component({
  selector: 'ngx-mat-timepicker-standalone',
  templateUrl: 'ngx-mat-timepicker-standalone.component.html',
  styleUrls: ['ngx-mat-timepicker-standalone.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.mat-app-background]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    AsyncPipe,
    A11yModule,
    MatButton,
    MatToolbar,
    NgxMatTimepickerDialComponent,
    NgxMatTimepickerContentComponent,
    NgxMatTimepicker24HoursFaceComponent,
    NgxMatTimepicker12HoursFaceComponent,
    NgxMatTimepickerMinutesFaceComponent,
  ],
})
export class NgxMatTimepickerStandaloneComponent extends NgxMatTimepickerBaseDirective {
  constructor(
    @Inject(NGX_MAT_TIMEPICKER_CONFIG)
    public override data: NgxMatTimepickerConfig,
    timepickerSrv: NgxMatTimepickerService,
    eventSrv: NgxMatTimepickerEventService,
    timepickerLocaleSrv: NgxMatTimepickerLocaleService,
  ) {
    super(timepickerSrv, eventSrv, timepickerLocaleSrv, data);
  }

  override close(): void {
    this.data.timepickerBaseRef.close();
  }
}
