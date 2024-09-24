import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimatedTextComponent } from '../animated-text/animated-text.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AnimatedTextComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  animatedWords = ['Software', 'Frontend', 'Angular'];
}
