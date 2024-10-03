import { of, BehaviorSubject } from 'rxjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule],
})
export class MockRouterModule {}

export const mockTranslateService = {
  get: jasmine.createSpy('get').and.returnValue(of('translated value')),
  instant: jasmine.createSpy('instant').and.returnValue('translated value'),
  setDefaultLang: jasmine.createSpy('setDefaultLang'),
  use: jasmine.createSpy('use').and.returnValue(of({})),
  stream: jasmine.createSpy('stream').and.returnValue(of('translated value')),
  onLangChange: new BehaviorSubject({ lang: 'en' }),
  onTranslationChange: new BehaviorSubject({}),
  onDefaultLangChange: new BehaviorSubject({}),
  currentLang: 'en',
};

export const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue(null),
    },
  },
  paramMap: of(new Map()),
};

export const mockLanguageService = {
  setDefaultLang: jasmine.createSpy('setDefaultLang'),
  use: jasmine.createSpy('use').and.returnValue(of({})),
};

const darkModeSubject = new BehaviorSubject<boolean>(false);

export const mockDarkModeService = {
  isDarkMode: jasmine.createSpy('isDarkMode').and.returnValue(false),
  toggleDarkMode: jasmine.createSpy('toggleDarkMode').and.callFake(() => {
    const currentValue = darkModeSubject.value;
    darkModeSubject.next(!currentValue);
  }),
  darkMode$: darkModeSubject.asObservable(),
};

export const mockArticleService = {
  getArticles: jasmine.createSpy('getArticles').and.returnValue(of([])),
};
