# @alexfriesen/ngx-mat-timepicker

[![npm][badge-npm-version]][url-npm]
[![MIT licensed][badge-licence]][url-licence]
[![Build state][badge-ci-state]][url-ci-state]
[![Size][badge-bundle]][url-bundle]

A simple time picker module using Angular Material: it provides an Android style dialog for time selection and a handy input for time selection in Material style.

<img width="371" alt="ngx-mat-datepicker preview" src="https://github.com/user-attachments/assets/53b98eb1-51a6-46b5-8dd1-a405ded668a0" />

## Table of contents

- [Getting started](#getting-started)
- [Internationalization](#internationalization)
- [Documentation](#documentation)
  - [NgxMatTimepicker](#ngxMatTimepicker)
  - [NgxMatTimepickerComponent](#ngxMatTimepickercomponent)
  - [NgxMatTimepickerFieldComponent](#ngxMatTimepickerfieldcomponent)
  - [NgxMatTimepickerToggleComponent](#ngxMatTimepickertogglecomponent)
  - [NgxMatTimepickerToggleIconDirective](#ngxMatTimepickertoggleicondirective)
- [Development](#development)
- [Tests](#tests)
- [License](#license)

## Getting started

Install timepicker through npm:

```bash
npm i --save @alexfriesen/ngx-mat-timepicker
```

Next import the timepicker module into your app's module:

```typescript
import { NgModule } from '@angular/core';
import { NgxMatTimepickerModule } from '@alexfriesen/ngx-mat-timepicker';

@NgModule({
  imports: [NgxMatTimepickerModule],
})
export class MyModule {}
```

Finally connect the timepicker to an input via a template property:

```html
<input [ngxMatTimepicker]="picker" />
<ngx-mat-timepicker #picker />
```

The timepicker opens once you click on the input

## Internationalization

Timepicker supports locales in format `BCP 47`. It has `en-US` locale by default.

To override default locale:

```typescript
import { NgModule } from '@angular/core';
import { NgxMatTimepickerModule } from '@alexfriesen/ngx-mat-timepicker';

@NgModule({
  imports: [NgxMatTimepickerModule.setLocale('en-GB')],
})
export class MyModule {}
```

## Theming

This Package relies on an existing Angular Material Theme:

```scss
@import '@angular/material/prebuilt-themes/indigo-pink.css';
```

or

```scss
@use '@angular/material' as mat;

@include mat.all-component-themes($my-theme);
```

## Documentation

#### API reference for Angular Material Timepicker

```typescript
import { NgxMatTimepickerModule } from '@alexfriesen/ngx-mat-timepicker';
```

#### NgxMatTimepicker

Directive responsible for managing the timepicker popup and setting value to input

Selector: `ngxMatTimepicker`

**Properties**

| Name                                                 | Description                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @Input() ngxMatTimepicker: NgxMatTimepickerComponent | The timepicker that this input is associated with.                                                                                                                  |
| @Input() color: ThemePalette                         | The material palette to use.                                                                                                                                        |
| @Input() disabled: boolean                           | Weather the timepicker popup should be disabled.                                                                                                                    |
| @Input() value: string                               | Set a default value and time for a timepicker. The format of the time is in 12 hours notation `11:00 PM` or in 24 hours notation `23:00`. A Date string won't work. |
| @Input() format: number                              | `12` or `24` . 12h/24h view for hour selection clock . `12` (AM/PM) format by default.                                                                              |
| @Input() min: string or DateTime                     | Set min time for timepicker (`11:15 pm` )                                                                                                                           |
| @Input() max: string or DateTime                     | Set max time for timepicker (`11:15 pm` )                                                                                                                           |
| @Input() disableClick: boolean                       | Set `true` to disable opening timepicker by clicking on the input                                                                                                   |

#### NgxMatTimepickerLocaleService

This service allows to **change the locale anytime**.  
You can inject this in your component or extend and provide your version, in order to provide your current locale to all the pickers!  
At this time is **semi-static**, which means you can't change the locale for pickers that are already opened.  
But **new pickers will always get the updated locale**.

#### NgxMatTimepickerComponent

Component responsible for visualisation the timepicker

Selector: `ngx-mat-timepicker`

**Properties**

| Name                                           | Description                                                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| @Input() cancelBtnTmpl: TemplateRef<Node>      | Set if you want to change cancel button to your custom one.                                                                                |
| @Input() confirmBtnTmpl: TemplateRef<Node>     | Set if you want to change confirm button to your custom one.                                                                               |
| @Input() editableHintTmpl: TemplateRef<Node>   | Set if you want to change dial hint to your custom one. Works only if `enableKeyboardInput = true`                                         |
| @Input() ESC: boolean                          | Disable or enable closing timepicker by ESC.                                                                                               |
| @Input() enableKeyboardInput: boolean          | To disable or enable changing time through a keyboard on the timepicker dial without interaction with a clock face. Set `false` by default |
| @Input() minutesGap: number                    | To define a gap between minutes. Set `1` by default                                                                                        |
| @Input() defaultTime: string                   | Set default time for a timepicker. `12:00 AM` by default                                                                                   |
| @Input() preventOverlayClick: boolean          | Set `true` to prevent closing the timepicker by overlay click. Uses `false` by default                                                     |
| @Input() disableAnimation: boolean             | Set `true` to prevent opening and closing timepicker animation. Uses `false` by default                                                    |
| @Input() hoursOnly: boolean                    | Set `true` to prevent switching to minutes automatically once hour is selected. Uses `false` by default                                    |
| @Input() theme: NgxMatTimepickerTheme          | Custom css properties which will override the defaults                                                                                     |
| @Input() timepickerClass: string               | To provide a custom css class for the timepicker                                                                                           |
| @Output() timeSet: EventEmitter\<string\>      | Emits time when that was set.                                                                                                              |
| @Output() opened: EventEmitter\<null\>         | Emits after timepicker was opened.                                                                                                         |
| @Output() closed: EventEmitter\<null\>         | Emits after timepicker was closed.                                                                                                         |
| @Output() hourSelected: EventEmitter\<number\> | Emits after hour was selected.                                                                                                             |
| @Output() timeChanged: EventEmitter\<string\>  | Emits once time was changed.                                                                                                               |

#### NgxMatTimepickerFieldComponent

The timepicker as a control.

Selector: `ngx-mat-timepicker-field`

**Properties**

| Name                                                  | Description                                                                 |
| ----------------------------------------------------- | --------------------------------------------------------------------------- |
| @Input() disabled: boolean                            | Whether the timepicker is disabled                                          |
| @Input() floatLabel: 'never' or 'always' or 'auto'    | Whether the labels of the fields should float, default to never             |
| @Input() toggleIcon: TemplateRef\<HTMLObjectElement\> | Provide custom `svg` icon for toggle button                                 |
| @Input() buttonAlign: 'right' or 'left'               | Positioning toggle button (`right` by default)                              |
| @Input() clockTheme: NgxMatTimepickerTheme            | Custom css properties which will override timepicker clock                  |
| @Input() controlOnly: boolean                         | Hide or display toggle button with the timepicker clock                     |
| @Input() format: number                               | `12` or `24` . Set format for timepicker. `12` (AM/PM) format by default.   |
| @Input() cancelBtnTmpl: TemplateRef\<Node\>           | Set if you want to change cancel button for timepicker to your custom one.  |
| @Input() confirmBtnTmpl: TemplateRef\<Node\>          | Set if you want to change confirm button for timepicker to your custom one. |
| @Input() min: string or DateTime                      | Set min time for timepicker (`11:15 pm` )                                   |
| @Input() max: string or DateTime                      | Set max time for timepicker (`11:15 pm` )                                   |

| @Output()  
 timeChanged: EventEmitter\<string\> | Emit a new time once it is changed. |

#### NgxMatTimepickerToggleComponent

Component responsible for opening the timepicker.

Selector: `ngx-mat-timepicker-toggle`

**Properties**

| Name                                    | Description                                     |
| --------------------------------------- | ----------------------------------------------- |
| @Input() for: NgxMatTimepickerComponent | Timepicker instance that the button will toggle |
| @Input() disabled: boolean              | Whether the toggle button is disabled           |

#### NgxMatTimepickerToggleIconDirective

Can be used to override the icon of a `NgxMatTimepickerToggleComponent`.

Selector: `[ngxMatTimepickerToggleIcon]`

**Properties**

| Name                                                  | Description                                            |
| ----------------------------------------------------- | ------------------------------------------------------ |
| @Input() ngxMatTimepickerTheme: NgxMatTimepickerTheme | Custom css properties which will override the defaults |

### Demo

<a href="https://alexfriesen.github.io/ngx-mat-timepicker/">Demo</a>

```terminal
$ npm
$ npm start
```

Run `npm test` to run tests once.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### Fork

This Project is a fork of: https://github.com/tonysamperi/ngx-mat-timepicker

[badge-bundle]: https://img.shields.io/bundlephobia/minzip/@alexfriesen/ngx-mat-timepicker
[badge-ci-state]: https://github.com/alexfriesen/ngx-mat-timepicker/actions/workflows/main.yml/badge.svg
[badge-licence]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[badge-npm-downloads]: https://img.shields.io/npm/dm/@alexfriesen/ngx-mat-timepicker.svg?style=flat-square
[badge-npm-version]: https://img.shields.io/npm/v/@alexfriesen/ngx-mat-timepicker.svg?style=flat-square
[url-bundle]: https://img.shields.io/bundlephobia/minzip/@alexfriesen/ngx-mat-timepicker
[url-ci-state]: https://github.com/alexfriesen/ngx-mat-timepicker/actions
[url-licence]: https://github.com/alexfriesen/ngx-mat-timepicker/blob/master/LICENSE
[url-npm]: https://www.npmjs.com/package/@alexfriesen/ngx-mat-timepicker
