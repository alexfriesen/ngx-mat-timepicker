import { TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import type { DateTime } from 'luxon';

import { NgxMatTimepickerFormatType } from './ngx-mat-timepicker-format.type';
import { NgxMatTimepickerRef } from './ngx-mat-timepicker-ref.interface';

export interface NgxMatTimepickerConfig {
  appendToInput: boolean;
  cancelBtnTmpl: TemplateRef<Node>;
  color: ThemePalette;
  confirmBtnTmpl: TemplateRef<Node>;
  defaultTime: string;
  disableAnimation: boolean;
  disabled: boolean;
  editableHintTmpl: TemplateRef<Node>;
  enableKeyboardInput: boolean;
  format: NgxMatTimepickerFormatType;
  hoursOnly: boolean;
  inputElement: HTMLInputElement;
  maxTime: DateTime;
  minTime: DateTime;
  minutesGap: number;
  preventOverlayClick: boolean;
  time: string;
  timepickerBaseRef: NgxMatTimepickerRef;
  timepickerClass: string;
}
