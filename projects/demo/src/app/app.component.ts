import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor() {
    const sanitizer = inject(DomSanitizer);
    const iconRegistry = inject(MatIconRegistry);

    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl(`/assets/angular.svg`),
    );
    iconRegistry.addSvgIcon(
      'theme',
      sanitizer.bypassSecurityTrustResourceUrl(`/assets/theme.svg`),
    );
    iconRegistry.addSvgIcon(
      'github-circle',
      sanitizer.bypassSecurityTrustResourceUrl(`/assets/github-circle.svg`),
    );
    iconRegistry.addSvgIcon(
      'github-round',
      sanitizer.bypassSecurityTrustResourceUrl(`/assets/github-round.svg`),
    );
  }
}
