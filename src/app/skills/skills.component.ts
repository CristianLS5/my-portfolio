import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  skills: Skill[] = [
    { name: 'Angular', icon: 'angular.svg', color: '#DD0031' },
    { name: 'AngularJS', icon: 'angularjs.svg', color: '#E23237' },
    { name: 'CSS3', icon: 'css3.svg', color: '#1572B6' },
    { name: 'HTML5', icon: 'html5.svg', color: '#E34F26' },
    { name: 'Figma', icon: 'figma.svg', color: '#F24E1E' },
    { name: 'ASP.NET', icon: 'azuredevops.svg', color: '#5C2D91' },
    { name: 'Tailwind CSS', icon: 'tailwind-css.svg', color: '#06B6D4' },
    { name: 'Jasmine', icon: 'jasmine.svg', color: '#8A4182' },
    { name: 'Karma', icon: 'karma.svg', color: '#56C0A7' },
    { name: 'Cypress', icon: 'cypress.svg', color: '#17202C' },
    { name: 'npm', icon: 'npm.svg', color: '#CB3837' },
    { name: 'TypeScript', icon: 'typescript.svg', color: '#3178C6' },
    { name: 'JavaScript', icon: 'javascript.svg', color: '#F7DF1E' },
    { name: 'Node.js', icon: 'nodejs.svg', color: '#339933' },
    { name: 'Java', icon: 'java.svg', color: '#007396' },
    { name: 'GitHub', icon: 'github-skill.svg', color: '#ffffff' },
    { name: 'GitLab', icon: 'gitlab.svg', color: '#FCA121' },
    { name: 'Docker', icon: 'docker.svg', color: '#2496ED' },
    { name: 'RxJS', icon: 'rxjs.svg', color: '#B7178C' },
    { name: 'Sass', icon: 'sass.svg', color: '#CC6699' },
    { name: 'StencilJS', icon: 'stencil.svg', color: '#4C48FF' },
    { name: 'Express', icon: 'express.svg', color: '#ffffff' },
    { name: 'Vercel', icon: 'vercel.svg', color: '#ffffff' },
    { name: 'Netlify', icon: 'netlify.svg', color: '#00C7B7' },
    { name: 'Firebase', icon: 'firebase.svg', color: '#000000' },
    { name: 'MongoDB', icon: 'mongodb.svg', color: '#00C7B7' },
  ];
}
