import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withViewTransitions,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { routes } from './app.routes';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { provideHttpClient } from '@angular/common/http';
import { TranslateConfigService } from './shared/services/translate-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      FontAwesomeModule,
      NgxTypedWriterModule,
      TranslateConfigService.getTranslateModule()
    ),
  ],
};
