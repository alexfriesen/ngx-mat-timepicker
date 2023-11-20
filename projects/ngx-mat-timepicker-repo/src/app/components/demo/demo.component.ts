import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { map } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import {
  NgxMatTimepickerComponent,
  NgxMatTimepickerLocaleService,
  NgxMatTimepickerToggleComponent,
  NgxMatTimepickerFieldComponent,
  NgxMatTimepickerDirective,
} from '@alexfriesen/ngx-mat-timepicker';

import pkg from '../../../../../../package.json';
import { CodeViewerComponent } from '../code-viewer/code-viewer.component';
import { NgxMatTimepickerLocaleKey } from '../../shared/ngx-mat-timepicker-locale-key.enum';
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
export class NgxMatTimepickerDemoComponent implements OnInit {
  get currentLocale(): NgxMatTimepickerLocaleKey {
    return this._localeOverrideSrv.locale as NgxMatTimepickerLocaleKey;
  }

  get currentLocaleKey(): string {
    return this.myLocalesReversed[this.currentLocale];
  }

  get buildRef(): string {
    return `${pkg.version}-build-dev`;
  }

  npmPackage = '@alexfriesen/ngx-mat-timepicker';
  githubLink: string = `https://github.com/alexfriesen/ngx-mat-timepicker`;
  latestVersion: string = '';
  maxTime: DateTime = DateTime.local().startOf('day').set({
    hour: 16,
    minute: 0,
  });
  messages: {
    opts?: { delay?: number | 'natural'; loop?: boolean };
    text: string;
  }[] = [];
  minTime: DateTime = this.maxTime.set({ hour: 14 });
  myLocaleKeys: NgxMatTimepickerLocaleKey[];
  myLocales: Record<keyof typeof NgxMatTimepickerLocaleKey, string> = {
    en: 'en-GB',
    it: 'it-IT',
    es: 'es-ES',
    fr: 'fr-FR',
  };
  myLocalesReversed: Record<string, NgxMatTimepickerLocaleKey> =
    Object.fromEntries(Object.entries(this.myLocales).map((a) => a.reverse()));
  npmLink: string = `https://www.npmjs.com/package/${this.npmPackage}`;
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
  themes: NgxMatTimepickerTheme[] = [
    { value: '', description: 'Light' },
    { value: 'dark-theme', description: 'Dark' },
  ];
  timeRegex: RegExp = /([0-9]|1\d):[0-5]\d (AM|PM)/;
  year: number = new Date().getFullYear();

  private _nextLocale: number = 0;

  constructor(private _localeOverrideSrv: NgxMatTimepickerLocaleService) {}

  debug(): void {
    console.info('focused input!');
  }

  ngOnInit(): void {
    this.myLocaleKeys = Object.keys(
      this.myLocales,
    ) as NgxMatTimepickerLocaleKey[];
    this.selectedTheme = this.themes[0];
    ajax
      .get(`https://unpkg.com/${this.npmPackage}@latest/package.json`)
      .pipe(
        map((raw: AjaxResponse<any>) => {
          return raw.response?.version;
        }),
      )
      .subscribe({
        next: (version: string) => {
          this.latestVersion = version;
        },
      });
  }

  onTimeSet($event: string): void {
    console.info('TIME UPDATED', $event);
  }

  selectedTimeFreeInputChanged($event: string): void {
    console.info('TIME CHANGED');
    this.pickerFreeInput.updateTime($event);
  }

  updateLocale(localeKey?: NgxMatTimepickerLocaleKey): void {
    if (localeKey) {
      this._nextLocale = this.myLocaleKeys.indexOf(localeKey) - 1;
    }
    this._localeOverrideSrv.updateLocale(
      this.myLocales[this.myLocaleKeys[++this._nextLocale]],
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
