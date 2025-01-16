import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgOptimizedImage } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ResumeComponent } from '../resume/resume.component';
import { ContactComponent } from '../contact/contact.component';
import { FadeInDirective } from '../shared/directives/fade-in.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TypewriterComponent,
    SkillsComponent,
    ProjectsComponent,
    ResumeComponent,
    FontAwesomeModule,
    NgOptimizedImage,
    ContactComponent,
    AboutComponent,
    TranslateModule,
    FadeInDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {}

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
    {
      text: 'Cristian López',
      shortText: 'Cristian López',
    },
    {
      text: 'a Software Developer',
      shortText: 'a Software Dev',
    },
    {
      text: 'a Front-end Specialist',
      shortText: 'a Front-end Dev',
    },
    {
      text: 'an Angular Enthusiast',
      shortText: 'an Angular Dev',
    },
  ];
}
