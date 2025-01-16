import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
  HostListener,
} from '@angular/core';
import {
  Router,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showHeaderContent = signal(false);
  currentLang: string;
  isMobileMenuOpen = false;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.currentLang = this.translateService.currentLang;
  }

  getResumeUrl(): string {
    return this.translateService.currentLang === 'en'
      ? 'assets/files/Cristian_Lopez_Resume.pdf'
      : 'assets/files/Cristian_Lopez_CV.pdf';
  }

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

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger-button');

    // Check if click is outside both menu and hamburger button
    if (this.isMobileMenuOpen && 
        menu && 
        hamburger && 
        !menu.contains(event.target as Node) && 
        !hamburger.contains(event.target as Node)) {
      this.isMobileMenuOpen = false;
    }
  }
}
