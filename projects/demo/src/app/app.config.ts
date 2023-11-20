import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([NativeDateModule, MatNativeDateModule]),
  ],
};
