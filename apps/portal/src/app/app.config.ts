import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { portalRoutes } from "@venusta/portal/shell";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { TableDirective } from "../../../../libs/portal/shared/directives/src/lib/table.directive";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(portalRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'nl-NL'
    },
    importProvidersFrom(TableDirective)
  ],
};