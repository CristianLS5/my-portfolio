import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  signal,
  ViewChildren,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

interface Experience {
  id: number;
  startDate: string;
  endDate: string;
  company: string;
  role: string;
  description: string;
  tasks: string[];
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent implements AfterViewInit {
  @Input() showTeaser = false;
  @ViewChildren('experienceCard') experienceCards!: QueryList<ElementRef>;

  experiences = signal<Experience[]>([
    {
      id: 1,
      startDate: 'January 2024',
      endDate: 'March 2024',
      company: 'NBX Digital',
      role: 'Frontend Developer',
      description:
        'Frontend developer for Rentsody internal app using Angular 17',
      tasks: [
        'Develop Angular libraries for services, components, styles, and icons for their future reuse in several applications, as well as the automatization, through pipelines in Azure DevOps, of the builds of these libraries and uploading them to a private npm feed for their use.',
        'Add style to the application using CSS • Flex and CSS Grid',
        'Develop the Docker file for the frontend application in order to build it as an image and be able to check it directly taking into account the ngnix config and the npm registry',
      ],
    },
    {
      id: 2,
      startDate: 'November 2023',
      endDate: 'January 2024',
      company: 'NBX Digital',
      role: 'Frontend Developer',
      description:
        'Frontend developer for Meridian Global Services using Angular 16',
      tasks: [
        'Refactor of old code using new methods supported by the latest version of Javascript',
        'Change all unsupported npm libraries for new ones adapting the affected components',
        'Investigate which libraries are not used anymore in the application and delete them',
      ],
    },
    {
      id: 3,
      startDate: 'October 2023',
      endDate: 'November 2023',
      company: 'GFT Technologies',
      role: 'Frontend Developer',
      description: 'Frontend developer for Aegon Seguros using Angular14',
      tasks: ['Developing improvements for the forms alerting system.'],
    },
    {
      id: 4,
      startDate: 'September 2023',
      endDate: 'November 2023',
      company: 'GFT Technologies',
      role: 'Frontend Developer',
      description:
        'Frontend developer for Zurich Insurance Group using Angular 12, FireBase and Google Cloud',
      tasks: [
        'Analysis of performance issues between the frontend and Firebase during the initial load of the application',
        'Analysis of performance issues between the components and a data visualization library.',
      ],
    },
    {
      id: 5,
      startDate: 'January 2022',
      endDate: 'August 2023',
      company: 'GFT Technologies',
      role: 'Frontend Developer',
      description:
        'Frontend Developer, first for Sistemes Electrònics Progrés and then for Vegga Digital, using Angular 13, AngularJS and StencilJS',
      tasks: [
        'Migrated an application from Angular 8 to Angular 13',
        'Added new columns in the database for some tables through backend using a Java library',
        'Improved the application using Stencil, which is a design system based in web components',
        'Collaborated in the change of the authorization method to log into the application, the backend proxy and the backend environment',
        'Used TypeScript (Angular 13) and JavaScript (AngularJS) to make changes to the current logic of the application to adapt new functionalities such as grids, overlays, search engines, and forms',
        'Researched and resolved incidents affecting the application, with respective solutions on the frontend when applicable, or escalation of the issue to the backend for data-related problems',
        'Collaborated with stakeholders during development processes to confirm creative proposals and design best practices',
        'Designed and updated layouts to meet usability and performance requirements',
        'Followed SDLC best practices within Agile environment to produce rapid iterations for clients',
      ],
    },
    {
      id: 6,
      startDate: 'January 2018',
      endDate: 'January 2022',
      company: 'GFT Technologies',
      role: 'Production Support Analyst',
      description: 'Production Support Analyst for Deutsche Bank',
      tasks: [
        'GTP project for Deutsche Bank changed to Squad using the Agile methodology',
        'Application maintenance for the ones which are deployed in UAT and PRD',
        'Incident analysis and resolution',
        'Changes, deployments, releases and Disaster Recovery interventions',
        'Application monitoring and alerting for the ones which are developed in Kubernetes using Scribe-Splunk',
        'System monitoring with tools like Graphana, APPDynamics',
        'Internal reports like the KPIs report and the abends report',
        'Automate some Excel functionalities used by the project with VB programming language',
        'Start the GLUE project for Deutsche Bank',
        'APIs creation using the WSO2 platform',
        'Users/clients management who are using the platform',
        'Installation and maintenance for GLUE Classic and GLUE 2G applications',
        'Installation for GLUE X application',
        'Data analysis and incident resolution',
        'Database reports',
      ],
    },
    {
      id: 7,
      startDate: 'September 2017',
      endDate: 'December 2017',
      company: 'GFT Technologies',
      role: 'Junior Software Developer',
      description: 'Frontend developer for Banc Sabadell',
      tasks: [
        'Developing an internal web application for the users in JavaScript and ASP.NET using the MVC architecture',
      ],
    },
    {
      id: 8,
      startDate: 'May 2016',
      endDate: 'April 2027',
      company: 'Actelgrup',
      role: 'Frontend Web Developer',
      description: '',
      tasks: ['Dual vocational training'],
    },
  ]);

  constructor(private router: Router) {}

  get displayedExperiences() {
    return this.showTeaser ? this.experiences().slice(0, 1) : this.experiences();
  }

  navigateToFullResume() {
    this.router.navigate(['/resume']);
  }

  ngAfterViewInit() {
    this.observeExperienceCards();
  }

  private observeExperienceCards() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add('show');
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.experienceCards.forEach((card) =>
      observer.observe(card.nativeElement)
    );
  }

  getYear(date: string): string {
    return date.split(' ')[1] || date; // This will return the year or the full date if splitting fails
  }
}
