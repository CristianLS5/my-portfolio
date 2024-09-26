import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TypewriterComponent, FontAwesomeModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  technologies = [
    'a Software Developer',
    'a Front-end Developer',
    'an Angular Enthusiastic',
    'Ironman',
  ];
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faEnvelope = faEnvelope;
  faUserFriends = faUserFriends;
}
