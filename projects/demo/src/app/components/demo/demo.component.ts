import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime } from 'luxon';

import {
  NgxMatTimepickerComponent,
  NgxMatTimepickerLocaleService,
  NgxMatTimepickerToggleComponent,
  NgxMatTimepickerFieldComponent,
  NgxMatTimepickerDirective,
} from '@alexfriesen/ngx-mat-timepicker';

import { CodeViewerComponent } from '../code-viewer/code-viewer.component';

interface NgxMatTimepickerTheme {
  description: string;
  value: string;
  dark: boolean;
  hexColor: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: 'demo.component.html',
  styleUrls: ['demo.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    MatMenuModule,
    MatToolbar,
    NgxMatTimepickerDirective,
    NgxMatTimepickerComponent,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerToggleComponent,
    CodeViewerComponent,
  ],
})
export class DemoComponent implements OnInit {
  private readonly localeOverrideSrv = inject(NgxMatTimepickerLocaleService);
  private readonly document = inject(DOCUMENT, { optional: true });

  currentLocale = this.localeOverrideSrv.locale;

  get currentLocaleKey(): string {
    return this.myLocalesReversed[this.currentLocale];
  }

  npmPackage = '@alexfriesen/ngx-mat-timepicker';
  npmLink = `https://www.npmjs.com/package/${this.npmPackage}`;
  githubLink = `https://github.com/alexfriesen/ngx-mat-timepicker`;

  maxTime = DateTime.local().startOf('day').set({
    hour: 16,
    minute: 20,
  });

  minTime = this.maxTime.set({ hour: 14 });

  myLocaleKeys = ['en', 'it', 'es', 'fr'];
  myLocalesMaps: Record<string, string> = {
    en: 'en-GB',
    it: 'it-IT',
    es: 'es-ES',
    fr: 'fr-FR',
  };
  myLocalesReversed = Object.fromEntries(
    Object.entries(this.myLocalesMaps).map((a) => a.reverse()),
  );

  readonly themes: NgxMatTimepickerTheme[] = [
    { value: '', description: 'Light', hexColor: '#fff', dark: false },
    { value: 'dark-theme', description: 'Dark', hexColor: '#444', dark: true },
  ];
  @ViewChild('pickerH') pickerFreeInput: NgxMatTimepickerComponent;
  selectedTheme: NgxMatTimepickerTheme;

  selectedTimes: Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H', string> =
    {
      A: undefined,
      B: undefined,
      C: undefined,
      D: undefined,
      E: undefined,
      F: undefined,
      G: undefined,
      H: undefined,
    };

  showInput = true;
  timeRegex = /([0-9]|1\d):[0-5]\d (AM|PM)/;
  year = new Date().getFullYear();

  private _nextLocale = 0;

  ngOnInit(): void {
    this.selectedTheme = this.themes[0];
  }

  onTimeSet($event: string): void {
    console.info('TIME UPDATED', $event);
  }

  selectedTimeFreeInputChanged($event: string): void {
    console.info('TIME CHANGED');
    this.pickerFreeInput.updateTime($event);
  }

  updateLocale(localeKey?: string): void {
    if (localeKey) {
      this._nextLocale = this.myLocaleKeys.indexOf(localeKey) - 1;
    }
    this.localeOverrideSrv.updateLocale(
      this.myLocalesMaps[this.myLocaleKeys[++this._nextLocale]],
    );
    if (this._nextLocale >= this.myLocaleKeys.length - 1) {
      this._nextLocale = -1;
    }
  }

  updateTheme(theme: NgxMatTimepickerTheme): void {
    this.selectedTheme = theme;
    this.document?.body.classList.toggle('dark-theme', !!theme.value);
  }

  updateTime($event: string, targetProp: string): void {
    console.info('TIME SET', $event);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any)[targetProp] = $event;
  }
}
