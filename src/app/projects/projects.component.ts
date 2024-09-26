import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Project } from '../models/project.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  projects = signal<Project[]>([
    {
      id: 1,
      title: 'Angular Project',
      description: 'A sample Angular project',
      backgroundImage: 'assets/images/angular.png',
      tags: ['Angular', 'TypeScript', 'RxJS'],
    },
    {
      id: 2,
      title: 'React Project',
      description: 'A sample React project',
      backgroundImage: 'assets/images/react.png',
      tags: ['React', 'JavaScript', 'Redux'],
    },
    {
      id: 3,
      title: 'React Project',
      description: 'A sample React project',
      backgroundImage: 'assets/images/react.png',
      tags: ['React', 'JavaScript', 'Redux'],
    },
    {
      id: 4,
      title: 'Angular Project',
      description: 'A sample Angular project',
      backgroundImage: 'assets/images/angular.png',
      tags: ['Angular', 'TypeScript', 'RxJS'],
    },
    // Add more projects as needed
  ]);
}
