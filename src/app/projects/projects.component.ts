import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../models/project.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription, interval } from 'rxjs';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects = signal<Project[]>([]);
  isLoading = signal(true);
  currentIndex = 0;
  private autoplaySubscription?: Subscription;
  private langChangeSubscription?: Subscription;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loadProjects();
    this.startAutoplay();
    this.langChangeSubscription = this.languageService.currentLang$.subscribe(() => {
      this.isLoading.set(true);
      this.loadProjects();
    });
  }

  ngOnDestroy() {
    this.stopAutoplay();
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  startAutoplay() {
    this.autoplaySubscription = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  stopAutoplay() {
    if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.projects().length;
  }

  prevSlide() {
    this.currentIndex = this.currentIndex === 0 
      ? this.projects().length - 1 
      : this.currentIndex - 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  loadProjects() {
    this.translate.get('PROJECTS').subscribe(() => {
      this.projects.set([
        {
          id: 1,
          title: 'PROJECTS.PROJECT1.TITLE',
          description: 'PROJECTS.PROJECT1.DESCRIPTION',
          backgroundImage: 'assets/images/my-portfolio-intro.png',
          tags: ['Angular', 'Tailwind CSS', 'Netlify'],
          url: 'https://cristianlopez.netlify.app/',
        },
        {
          id: 2,
          title: 'PROJECTS.PROJECT2.TITLE',
          description: 'PROJECTS.PROJECT2.DESCRIPTION',
          backgroundImage: 'assets/images/css-features-project.png',
          tags: ['Angular', 'SCSS', 'Vercel'],
          url: 'https://css-features-cristianls5.vercel.app/',
        },
        {
          id: 3,
          title: 'PROJECTS.PROJECT3.TITLE',
          description: 'PROJECTS.PROJECT3.DESCRIPTION',
          backgroundImage: 'assets/images/wow-api-authentication.png',
          tags: ['JavaScript', 'Express', 'Vercel'],
          url: 'https://wow-api-authentication.vercel.app/',
        },
        {
          id: 4,
          title: 'PROJECTS.PROJECT4.TITLE',
          description: 'PROJECTS.PROJECT4.DESCRIPTION',
          backgroundImage: 'assets/images/scratch-card-game.png',
          tags: ['Angular', 'SCSS', 'GHPages'],
          url: 'https://cristianls5.github.io/scratch-card-game/',
        },
        {
          id: 5,
          title: 'PROJECTS.PROJECT3.TITLE',
          description: 'PROJECTS.PROJECT3.DESCRIPTION',
          backgroundImage: 'assets/images/wow-api-authentication.png',
          tags: ['JavaScript', 'Express', 'Vercel'],
          url: 'https://wow-api-authentication.vercel.app/',
        },
      ]);
      this.isLoading.set(false);
    });
  }

  isPrev(index: number): boolean {
    const totalItems = this.projects().length;
    return (
      index === (this.currentIndex - 1 + totalItems) % totalItems
    );
  }

  isPrev2(index: number): boolean {
    const totalItems = this.projects().length;
    return (
      index === (this.currentIndex - 2 + totalItems) % totalItems
    );
  }

  isNext(index: number): boolean {
    const totalItems = this.projects().length;
    return (
      index === (this.currentIndex + 1) % totalItems
    );
  }

  isNext2(index: number): boolean {
    const totalItems = this.projects().length;
    return (
      index === (this.currentIndex + 2) % totalItems
    );
  }
}
