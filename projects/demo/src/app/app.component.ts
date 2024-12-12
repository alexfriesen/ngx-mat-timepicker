import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { injectIcons } from './utils/inject-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet]
})
export class AppComponent {
  constructor() {
    injectIcons();
  }
}
