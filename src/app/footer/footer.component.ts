import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faFileDownload = faFileDownload;

  constructor(private translate: TranslateService) {}

  getResumeUrl(): string {
    return this.translate.currentLang === 'en'
      ? 'assets/files/Cristian_Lopez_Resume.pdf'
      : 'assets/files/Cristian_Lopez_CV.pdf';
  }

  getLinkedInUrl(): string {
    return this.translate.currentLang === 'es'
      ? 'https://www.linkedin.com/in/cristian-l%C3%B3pez-sol%C3%A1-2b6493204/'
      : 'https://www.linkedin.com/in/cristian-l%C3%B3pez-sol%C3%A1-2b6493204/?locale=en_US';
  }
}
