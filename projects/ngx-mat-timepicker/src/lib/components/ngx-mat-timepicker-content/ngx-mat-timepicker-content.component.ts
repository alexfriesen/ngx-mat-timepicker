import { Component, Input, booleanAttribute } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ngx-mat-timepicker-content',
  templateUrl: './ngx-mat-timepicker-content.component.html',
  imports: [NgTemplateOutlet]
})
export class NgxMatTimepickerContentComponent {
  @Input({ transform: booleanAttribute }) appendToInput: boolean;
  @Input() inputElement: HTMLInputElement;
}
