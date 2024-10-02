import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private langSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.langSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.langSubject.next(lang);
  }
}
