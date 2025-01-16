import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Injectable({
  providedIn: 'root',
})
export class TranslateConfigService {
  constructor(private http: HttpClient) {}

  static httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

  static getTranslateModule() {
    return TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateConfigService.httpLoaderFactory,
        deps: [HttpClient],
      },
    });
  }
}
