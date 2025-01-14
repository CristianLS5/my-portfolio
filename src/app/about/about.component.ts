import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngular,
  faCss3Alt,
  faHtml5,
  faNodeJs,
  faGithub,
  faDocker,
} from '@fortawesome/free-brands-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

interface TechLogo {
  name: string;
  icon: any;
  size: string;
  animationDuration: string;
  color: string;
  darkModeColor?: string; // Add this line
  isSvg?: boolean;
  startPosition: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {

  centralLogo = {
    name: 'Angular',
    icon: faAngular,
    color: '#DD0031',
    size: '50px', // Increased size for the central Angular logo
  };

  techLogos = signal<TechLogo[]>([
    {
      name: 'TypeScript',
      icon: 'typescript.svg',
      size: '28px',
      animationDuration: '8s',
      color: '#3178C6',
      isSvg: true,
      startPosition: '0deg',
    },
    {
      name: 'RxJS',
      icon: 'rxjs.svg',
      size: '24px',
      animationDuration: '12s',
      color: '#B7178C',
      isSvg: true,
      startPosition: '45deg',
    },
    {
      name: 'HTML5',
      icon: faHtml5,
      size: '32px',
      animationDuration: '16s',
      color: '#E34F26',
      startPosition: '90deg',
    },
    {
      name: 'CSS3',
      icon: faCss3Alt,
      size: '30px',
      animationDuration: '20s',
      color: '#1572B6',
      startPosition: '135deg',
    },
    {
      name: 'JavaScript',
      icon: 'javascript.svg',
      size: '34px',
      animationDuration: '24s',
      color: '#F7DF1E',
      isSvg: true,
      startPosition: '180deg',
    },
    {
      name: 'Node.js',
      icon: faNodeJs,
      size: '36px',
      animationDuration: '28s',
      color: '#339933',
      startPosition: '225deg',
    },
    {
      name: 'GitHub',
      icon: faGithub,
      size: '26px',
      animationDuration: '32s',
      color: '#181717',
      darkModeColor: '#ffffff',
      startPosition: '270deg',
    },
    {
      name: 'Docker',
      icon: faDocker,
      size: '38px',
      animationDuration: '36s',
      color: '#2496ED',
      startPosition: '315deg',
    },
  ]);
}
