import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLaptopCode, faCode } from '@fortawesome/free-solid-svg-icons';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { DarkModeService } from '../services/dark-mode.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggleDarkMode = new EventEmitter<void>();
  showHeaderContent = signal(false);
  currentLang: string;

  constructor(
    private el: ElementRef,
    public darkModeService: DarkModeService,
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.currentLang = this.translateService.currentLang;
  }

  get isDarkMode() {
    return this.darkModeService.isDarkMode();
  }

  faLaptopCode = faCode; // Icon for software
  faCode = faLaptopCode; // Icon for frontend
  faAngular = faAngular; // Icon for Angular

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
      const introRect = introSection.getBoundingClientRect();
      this.showHeaderContent.set(introRect.bottom <= 0);
    }
  }

  scrollToSection(sectionId: string) {
    if (this.router.url !== '/') {
      this.router.navigate(['/'], { fragment: sectionId });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
    this.languageService.setLanguage(this.currentLang);
  }
}
