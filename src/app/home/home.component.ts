import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from '../intro/intro.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ArticlesComponent } from '../articles/articles.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgOptimizedImage } from '@angular/common';
import { DarkModeService } from '../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TypewriterComponent,
    IntroComponent,
    SkillsComponent,
    ProjectsComponent,
    ArticlesComponent,
    FontAwesomeModule,
    NgOptimizedImage,
    ContactComponent,
    AboutComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private darkModeSubscription: Subscription | undefined;

  constructor(
    private darkModeService: DarkModeService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );
  }

  ngOnDestroy() {
    this.darkModeSubscription?.unsubscribe();
  }

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

  technologies = [
    'a Software Developer',
    'a Front-end Specialist',
    'an Angular Enthusiastic',
    'Ironman',
  ];

  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faFileDownload = faFileDownload;
}
