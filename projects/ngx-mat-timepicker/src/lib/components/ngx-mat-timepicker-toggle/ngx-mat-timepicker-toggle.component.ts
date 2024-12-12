import { Component, ContentChild, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';

import { NgxMatTimepickerToggleIconDirective } from '../../directives/ngx-mat-timepicker-toggle-icon.directive';
import { NgxMatTimepickerComponent } from '../ngx-mat-timepicker/ngx-mat-timepicker.component';

@Component({
  selector: 'ngx-mat-timepicker-toggle',
  templateUrl: 'ngx-mat-timepicker-toggle.component.html',
  styleUrls: ['ngx-mat-timepicker-toggle.component.scss'],
  imports: [MatIconButton],
})
export class NgxMatTimepickerToggleComponent {
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled === undefined
      ? this.timepicker?.disabled
      : this._disabled;
  }

  @ContentChild(NgxMatTimepickerToggleIconDirective, { static: true })
  customIcon: NgxMatTimepickerToggleIconDirective;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('for') timepicker: NgxMatTimepickerComponent;

  private _disabled: boolean;

  open(event: MouseEvent): void {
    if (this.timepicker) {
      this.timepicker.open();
      event.stopPropagation();
    }
  }
}
