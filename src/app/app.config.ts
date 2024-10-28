import { ApplicationConfig, importProvidersFrom, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { OpeniaService } from './services/openia.service';

export const appConfig: ApplicationConfig = {
  providers: [
    OpeniaService,
    importProvidersFrom(NgModule),
    HttpClientModule,
    provideHttpClient(),
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch())
  ]
};
