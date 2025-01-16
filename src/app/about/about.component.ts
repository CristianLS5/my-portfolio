import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface TechLogo {
  name: string;
  icon: string;
  size: string;
  animationDuration: string;
  color: string;
  startPosition: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  centralLogo = {
    name: 'Angular',
    icon: 'angular.svg',
    color: '#DD0031',
    size: '50px',
  };

  techLogos = signal<TechLogo[]>([
    {
      name: 'npm',
      icon: 'npm.svg',
      size: '28px',
      animationDuration: '8s',
      color: '#CB3837',
      startPosition: '0deg',
    },
    {
      name: 'TypeScript',
      icon: 'typescript.svg',
      size: '32px',
      animationDuration: '12s',
      color: '#3178C6',
      startPosition: '45deg',
    },
    {
      name: 'HTML5',
      icon: 'html5.svg',
      size: '34px',
      animationDuration: '16s',
      color: '#E34F26',
      startPosition: '90deg',
    },
    {
      name: 'CSS3',
      icon: 'css3.svg',
      size: '34px',
      animationDuration: '20s',
      color: '#1572B6',
      startPosition: '135deg',
    },
    {
      name: 'Node.js',
      icon: 'nodejs.svg',
      size: '36px',
      animationDuration: '24s',
      color: '#339933',
      startPosition: '180deg',
    },
    {
      name: 'MongoDB',
      icon: 'mongodb.svg',
      size: '36px',
      animationDuration: '28s',
      color: '#47A248',
      startPosition: '225deg',
    },
    {
      name: 'Docker',
      icon: 'docker.svg',
      size: '38px',
      animationDuration: '32s',
      color: '#2496ED',
      startPosition: '270deg',
    },
    {
      name: 'GitHub',
      icon: 'github-skill.svg',
      size: '38px',
      animationDuration: '36s',
      color: '#ffffff',
      startPosition: '315deg',
    },
  ]);
}
