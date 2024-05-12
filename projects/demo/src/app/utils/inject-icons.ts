import { inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

export function injectIcons() {
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
