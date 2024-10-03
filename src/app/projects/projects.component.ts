import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Project } from '../models/project.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router'; // Add this import

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule, RouterModule], // Add RouterModule
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects = signal<Project[]>([]);
  isLoading = signal(true);
  private langChangeSubscription: Subscription | undefined;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loadProjects();
    this.langChangeSubscription = this.languageService.currentLang$.subscribe(
      () => {
        this.isLoading.set(true);
        this.loadProjects();
      }
    );
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  loadProjects() {
    this.translate.get('PROJECTS').subscribe(() => {
      this.projects.set([
        {
          id: 1,
          title: 'PROJECTS.PROJECT1.TITLE',
          description: 'PROJECTS.PROJECT1.DESCRIPTION',
          backgroundImage: 'assets/images/my-portfolio-intro.png',
          tags: ['Angular', 'Node.js', 'Tailwind CSS'],
          url: 'https://cristianlopez.netlify.app/', // Real URL for your portfolio
        },
        {
          id: 2,
          title: 'PROJECTS.PROJECT2.TITLE',
          description: 'PROJECTS.PROJECT2.DESCRIPTION',
          backgroundImage: 'assets/images/react.png',
          tags: ['React', 'JavaScript', 'Redux'],
          url: 'https://example.com/project2', // Fake URL for testing
        },
        {
          id: 3,
          title: 'PROJECTS.PROJECT3.TITLE',
          description: 'PROJECTS.PROJECT3.DESCRIPTION',
          backgroundImage: 'assets/images/react.png',
          tags: ['React', 'JavaScript', 'Redux'],
          url: 'https://example.com/project3', // Fake URL for testing
        },
        {
          id: 4,
          title: 'PROJECTS.PROJECT4.TITLE',
          description: 'PROJECTS.PROJECT4.DESCRIPTION',
          backgroundImage: 'assets/images/angular.png',
          tags: ['Angular', 'TypeScript', 'RxJS'],
          url: 'https://example.com/project4', // Fake URL for testing
        },
      ]);
      this.isLoading.set(false);
    });
  }
}
