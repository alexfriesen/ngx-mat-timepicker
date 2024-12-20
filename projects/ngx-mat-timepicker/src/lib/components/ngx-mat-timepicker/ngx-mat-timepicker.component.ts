import {
  Component,
  HostBinding,
  Input,
  TemplateRef,
  booleanAttribute,
  inject,
  input,
  output,
} from '@angular/core';
import {
  CdkOverlayOrigin,
  ConnectedPosition,
  OverlayRef,
  CdkConnectedOverlay,
} from '@angular/cdk/overlay';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { DateTime } from 'luxon';

import { NgxMatTimepickerRef } from '../../models/ngx-mat-timepicker-ref.interface';
import { NgxMatTimepickerConfig } from '../../models/ngx-mat-timepicker-config.interface';
import { NgxMatTimepickerFormatType } from '../../models/ngx-mat-timepicker-format.type';
import { NGX_MAT_TIMEPICKER_CONFIG } from '../../tokens/ngx-mat-timepicker-config.token';
import { NgxMatTimepickerAdapter } from '../../services/ngx-mat-timepicker-adapter';
import { NgxMatTimepickerDirective } from '../../directives/ngx-mat-timepicker.directive';
import { NgxMatTimepickerDialogComponent } from '../ngx-mat-timepicker-dialog/ngx-mat-timepicker-dialog.component';
import { NgxMatTimepickerStandaloneComponent } from '../ngx-mat-timepicker-standalone/ngx-mat-timepicker-standalone.component';

let config: NgxMatTimepickerConfig;

@Component({
  selector: 'ngx-mat-timepicker',
  template: `
    <ng-template
      cdkConnectedOverlay
      cdkConnectedOverlayHasBackdrop
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      [cdkConnectedOverlayOpen]="showPicker"
      [cdkConnectedOverlayOrigin]="overlayOrigin"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (backdropClick)="close()"
    >
      <ngx-mat-timepicker-standalone />
    </ng-template>
  `,
  providers: [
    {
      provide: NGX_MAT_TIMEPICKER_CONFIG,
      useFactory() {
        return config;
      },
    },
  ],
  imports: [CdkConnectedOverlay, NgxMatTimepickerStandaloneComponent]
})
export class NgxMatTimepickerComponent implements NgxMatTimepickerRef {
  private readonly _dialog = inject(MatDialog);

  static nextId = 0;

  @Input({ transform: booleanAttribute })
  appendToInput = false;

  color = input<ThemePalette>('primary');

  get disabled(): boolean {
    return this._timepickerInput?.disabled;
  }

  @Input({ transform: booleanAttribute })
  enableKeyboardInput: boolean;

  @Input()
  set format(value: NgxMatTimepickerFormatType) {
    this._format = NgxMatTimepickerAdapter.isTwentyFour(value) ? 24 : 12;
  }
  get format(): NgxMatTimepickerFormatType {
    return this._timepickerInput?.format ?? this._format;
  }

  get inputElement(): HTMLInputElement {
    return this._timepickerInput?.element;
  }

  get maxTime(): DateTime {
    return this._timepickerInput
      ? (this._timepickerInput.max as DateTime)
      : this.max;
  }

  get minTime(): DateTime {
    return this._timepickerInput
      ? (this._timepickerInput.min as DateTime)
      : this.min;
  }

  @Input()
  set minutesGap(gap: number) {
    if (gap == null) {
      return;
    }
    gap = Math.floor(gap);
    this._minutesGap = gap <= 59 ? gap : 1;
  }
  get minutesGap(): number {
    return this._minutesGap;
  }

  get overlayOrigin(): CdkOverlayOrigin {
    return this._timepickerInput
      ? this._timepickerInput.cdkOverlayOrigin
      : undefined;
  }

  get time(): string {
    return this._timepickerInput?.value;
  }

  @Input() cancelBtnTmpl: TemplateRef<Node>;
  @Input() confirmBtnTmpl: TemplateRef<Node>;
  @Input() editableHintTmpl: TemplateRef<Node>;

  @Input() defaultTime: string;
  @Input({ transform: booleanAttribute })
  disableAnimation: boolean;
  @Input({ transform: booleanAttribute })
  preventOverlayClick: boolean;
  @Input() hoursOnly = false;
  @Input() isEsc = true;

  @Input() max: DateTime;
  @Input() min: DateTime;
  @Input() timepickerClass: string;

  readonly opened = output<void>();
  readonly closed = output<void>();
  readonly timeSet = output<string>();
  readonly timeChanged = output<string>();
  readonly hourSelected = output<number>();

  @HostBinding('id') id =
    `ngx_mat_timepicker_${++NgxMatTimepickerComponent.nextId}`;

  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 0,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: 0,
    },
  ];
  showPicker = false;
  timeUpdated$ = new BehaviorSubject<string>(undefined); // used in the dialog, check if a better approach can be used

  private _dialogRef: MatDialogRef<NgxMatTimepickerDialogComponent, void>;
  private _format: NgxMatTimepickerFormatType = 12;
  private _minutesGap: number;
  private _overlayRef: OverlayRef;
  private _timepickerInput: NgxMatTimepickerDirective;

  close(): void {
    if (this.appendToInput) {
      this._overlayRef?.dispose();
    } else {
      this._dialogRef?.close();
    }
    this.inputElement.focus(); // Fix ExpressionHasChangedAfterCheck error on overlay destroy
    this.showPicker = false;
    this.closed.emit();
  }

  open(): void {
    // Set data to be injected
    config = {
      timepickerBaseRef: this,
      time: this.time,
      defaultTime: this.defaultTime,
      maxTime: this.maxTime,
      minTime: this.minTime,
      format: this.format,
      minutesGap: this.minutesGap,
      disableAnimation: this.disableAnimation,
      cancelBtnTmpl: this.cancelBtnTmpl,
      confirmBtnTmpl: this.confirmBtnTmpl,
      editableHintTmpl: this.editableHintTmpl,
      disabled: this.disabled,
      enableKeyboardInput: this.enableKeyboardInput,
      preventOverlayClick: this.preventOverlayClick,
      appendToInput: this.appendToInput,
      hoursOnly: this.hoursOnly,
      timepickerClass: this.timepickerClass,
      inputElement: this.inputElement,
      color: this.color(),
    };

    if (this.appendToInput) {
      this.showPicker = true;
    } else {
      this._dialogRef = this._dialog.open(NgxMatTimepickerDialogComponent, {
        panelClass: 'ngx-mat-timepicker-dialog',
        data: {
          ...config,
        },
      });
      this._dialogRef.afterClosed().subscribe(() => {
        this.closed.emit();
      });
    }

    this.opened.emit();
  }

  /***
   * Register an input with this timepicker.
   * input - The timepicker input to register with this timepicker
   */
  registerInput(input: NgxMatTimepickerDirective): void {
    if (this._timepickerInput) {
      console.warn('Input for this timepicker was already set', input.element);
      throw Error('A Timepicker can only be associated with a single input.');
    }
    this._timepickerInput = input;
  }

  unregisterInput(): void {
    this._timepickerInput = undefined;
  }

  updateTime(time: string): void {
    this.timeUpdated$.next(time);
  }
}
