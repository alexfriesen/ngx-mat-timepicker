import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[ngxMatTimepickerAutofocus]',
  standalone: true,
})
export class NgxMatTimepickerAutofocusDirective
  implements OnChanges, OnDestroy
{
  private readonly _element = inject(ElementRef);
  private readonly _document = inject(DOCUMENT, { optional: true });

  @Input('ngxMatTimepickerAutofocus') isFocusActive: boolean;

  private _activeElement = this._document?.activeElement as HTMLElement;

  ngOnChanges() {
    if (this.isFocusActive) {
      // To avoid ExpressionChangedAfterItHasBeenCheckedError;
      setTimeout(() =>
        this._element.nativeElement.focus({ preventScroll: true }),
      );
    }
  }

  ngOnDestroy() {
    // To avoid ExpressionChangedAfterItHasBeenCheckedError;
    setTimeout(() => this._activeElement?.focus({ preventScroll: true }));
  }
}
