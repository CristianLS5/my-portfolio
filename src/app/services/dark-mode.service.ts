import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // Initialize dark mode based on user preference or saved setting
    this.initializeDarkMode();
  }

  private initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.darkModeSubject.next(isDarkMode);
    this.updateBodyClass(isDarkMode);
  }

  toggleDarkMode() {
    const newDarkModeState = !this.darkModeSubject.value;
    this.darkModeSubject.next(newDarkModeState);
    this.updateBodyClass(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
  }

  isDarkMode() {
    return this.darkModeSubject.value;
  }

  private updateBodyClass(isDark: boolean) {
    if (isDark) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }
}
