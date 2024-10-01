import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  experiences: Experience[] = [
    {
      id: 1,
      startDate: 'January 2024',
      endDate: 'Current',
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
  ];

  toggleTasks(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const tasks = target.querySelector('.tasks');
    tasks?.classList.toggle('hidden');
    document.querySelectorAll('.experience-card').forEach((item) => {
      if (item !== target) {
        item.classList.toggle('opacity-50');
      }
    });
  }
}
