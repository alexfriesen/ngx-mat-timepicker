import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  NgxMatTimepickerComponent,
  NgxMatTimepickerLocaleService,
  NgxMatTimepickerToggleComponent,
  NgxMatTimepickerFieldComponent,
  NgxMatTimepickerDirective,
} from '@alexfriesen/ngx-mat-timepicker';

import { CodeViewerComponent } from '../code-viewer/code-viewer.component';
import { DateTime } from 'ts-luxon';

interface NgxMatTimepickerTheme {
  description: string;
  value: string;
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
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    NgxMatTimepickerDirective,
    NgxMatTimepickerComponent,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerToggleComponent,
    CodeViewerComponent,
  ],
})
export class DemoComponent implements OnInit {
  get currentLocale(): string {
    return this._localeOverrideSrv.locale;
  }

  get currentLocaleKey(): string {
    return this.myLocalesReversed[this.currentLocale];
  }

  npmPackage = '@alexfriesen/ngx-mat-timepicker';
  npmLink: string = `https://www.npmjs.com/package/${this.npmPackage}`;
  githubLink: string = `https://github.com/alexfriesen/ngx-mat-timepicker`;

  maxTime: DateTime = DateTime.local().startOf('day').set({
    hour: 16,
    minute: 0,
  });

  minTime: DateTime = this.maxTime.set({ hour: 14 });

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
    { value: '', description: 'Light' },
    { value: 'dark-theme', description: 'Dark' },
  ];
  @ViewChild('pickerH') pickerFreeInput: NgxMatTimepickerComponent;
  selectedTheme: NgxMatTimepickerTheme;

  selectedTimes: Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H', string> =
    {
      A: void 0,
      B: void 0,
      C: void 0,
      D: void 0,
      E: void 0,
      F: void 0,
      G: void 0,
      H: void 0,
    };

  showInput: boolean = !0;
  timeRegex: RegExp = /([0-9]|1\d):[0-5]\d (AM|PM)/;
  year: number = new Date().getFullYear();

  private _nextLocale: number = 0;

  constructor(private _localeOverrideSrv: NgxMatTimepickerLocaleService) {}

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
    this._localeOverrideSrv.updateLocale(
      this.myLocalesMaps[this.myLocaleKeys[++this._nextLocale]],
    );
    this._nextLocale >= this.myLocaleKeys.length - 1 && (this._nextLocale = -1);
  }

  updateTheme(theme: NgxMatTimepickerTheme): void {
    this.selectedTheme = theme;
    document.body.classList.toggle('dark-theme', !!theme.value);
  }

  updateTime($event: string, targetProp: string): void {
    console.info('TIME SET', $event);
    (this as any)[targetProp] = $event;
  }
}
