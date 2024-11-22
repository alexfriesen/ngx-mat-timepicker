import { afterNextRender, Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

import { NgxMatTimepickerLocaleService } from '@alexfriesen/ngx-mat-timepicker';

import { ExampleFormat12Component } from '../../examples/format-12/format-12.component';
import { ExampleFormat24Component } from '../../examples/format-24/format-24.component';
import { ExampleAppendComponent } from '../../examples/append/append.component';
import { ExamplePickerOpenComponent } from '../../examples/picker-open/picker-open.component';
import { ExamplePickerToggleComponent } from '../../examples/picker-toggle/picker-toggle.component';
import { ExampleFieldComponent } from '../../examples/field/field.component';
import { ExampleValidationComponent } from '../../examples/validation/validation.component';
import { ExampleCompletionComponent } from '../../examples/completion/completion.component';
import { ExampleDialogComponent } from '../../examples/dialog/dialog.component';

interface NgxMatTimepickerTheme {
  description: string;
  value: string;
  hexColor: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: 'demo.component.html',
  styleUrls: ['demo.component.scss'],
  imports: [
    MatAnchor,
    MatButton,
    MatIconButton,
    MatIcon,
    MatToolbar,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatCard,
    MatCardContent,
    MatButtonToggleGroup,
    MatButtonToggle,
    ExampleFormat12Component,
    ExampleFormat24Component,
    ExampleAppendComponent,
    ExamplePickerOpenComponent,
    ExamplePickerToggleComponent,
    ExampleFieldComponent,
    ExampleValidationComponent,
    ExampleCompletionComponent,
    ExampleDialogComponent,
  ]
})
export class DemoComponent {
  private readonly localeOverrideSrv = inject(NgxMatTimepickerLocaleService);
  private readonly document = inject(DOCUMENT, { optional: true });

  readonly locales = ['en-GB', 'it-IT', 'es-ES', 'fr-FR', 'de-DE'];
  readonly currentLocale = signal(this.localeOverrideSrv.locale);

  readonly npmPackage = '@alexfriesen/ngx-mat-timepicker';
  readonly npmLink = `https://www.npmjs.com/package/${this.npmPackage}`;
  readonly githubLink = `https://github.com/alexfriesen/ngx-mat-timepicker`;

  readonly colors: NgxMatTimepickerTheme[] = [
    { value: 'default', description: 'Red', hexColor: '#f44336' },
    { value: 'blue', description: 'Blue', hexColor: '#2196f3' },
    { value: 'orange', description: 'Orange', hexColor: '#ff9800' },
  ];
  readonly selectedColor = signal('default');
  readonly isDark = signal(false);

  readonly year = new Date().getFullYear();

  constructor() {
    afterNextRender(() => {
      if (!this.locales.includes(this.currentLocale())) {
        this.updateLocale(this.locales[0]);
      }
    });
  }

  updateLocale(locale: string): void {
    this.localeOverrideSrv.updateLocale(locale);
    this.currentLocale.set(locale);
  }

  nextLocale(): void {
    let index = this.locales.indexOf(this.currentLocale());
    index++;

    if (index >= this.locales.length) {
      index = 0;
    }

    this.updateLocale(this.locales[index]);
  }

  toggleTheme(): void {
    this.isDark.set(!this.isDark());
    this.document?.body.classList.toggle('dark', this.isDark());
  }

  updateColor(value: string): void {
    this.selectedColor.set(value);
    for (const color of this.colors) {
      this.document?.body.classList.toggle(color.value, color.value === value);
    }
  }
}
