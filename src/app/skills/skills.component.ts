import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngular,
  faCss3Alt,
  faHtml5,
  faFigma,
  faMicrosoft,
  faNpm,
  faNodeJs,
  faJava,
  faGithub,
  faGitlab,
  faDocker,
} from '@fortawesome/free-brands-svg-icons';

interface Skill {
  name: string;
  icon: any;
  color: string;
  isSvg?: boolean;
  darkModeInvert?: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  @Input() isDarkMode: boolean = false;

  skills: Skill[] = [
    { name: 'Angular', icon: faAngular, color: '#DD0031' },
    { name: 'AngularJS', icon: faAngular, color: '#E23237' },
    { name: 'CSS3', icon: faCss3Alt, color: '#1572B6' },
    { name: 'HTML5', icon: faHtml5, color: '#E34F26' },
    { name: 'Figma', icon: faFigma, color: '#F24E1E' },
    { name: 'ASP.NET', icon: faMicrosoft, color: '#5C2D91' },
    {
      name: 'Tailwind CSS',
      icon: 'tailwind-css.svg',
      color: '#06B6D4',
      isSvg: true,
    },
    { name: 'Jasmine', icon: 'jasmine.svg', color: '#8A4182', isSvg: true },
    { name: 'Karma', icon: 'karma.svg', color: '#56C0A7', isSvg: true },
    { name: 'Cypress', icon: 'cypress.svg', color: '#17202C', isSvg: true, darkModeInvert: true },
    { name: 'npm', icon: faNpm, color: '#CB3837' },
    {
      name: 'TypeScript',
      icon: 'typescript.svg',
      color: '#3178C6',
      isSvg: true,
    },
    {
      name: 'JavaScript',
      icon: 'javascript.svg',
      color: '#F7DF1E',
      isSvg: true,
    },
    {
      name: 'Azure DevOps',
      icon: 'azuredevops',
      color: '#0078D7',
      isSvg: true,
    },
    { name: 'Node.js', icon: faNodeJs, color: '#339933' },
    { name: 'Java', icon: faJava, color: '#007396' },
    { name: 'GitHub', icon: faGithub, color: '#181717', darkModeInvert: true },
    { name: 'GitLab', icon: faGitlab, color: '#FCA121' },
    { name: 'Docker', icon: faDocker, color: '#2496ED' },
    { name: 'RxJS', icon: 'rxjs.svg', color: '#B7178C', isSvg: true },
    { name: 'Sass', icon: 'sass.svg', color: '#CC6699', isSvg: true },
    { name: 'StencilJS', icon: 'stencil.svg', color: '#4C48FF', isSvg: true },
    { name: 'Express', icon: 'express.svg', color: '#000000', isSvg: true, darkModeInvert: true },
    { name: 'Vercel', icon: 'vercel.svg', color: '#000000', isSvg: true, darkModeInvert: true },
    { name: 'Netlify', icon: 'netlify.svg', color: '#00C7B7', isSvg: true },
  ];
}
