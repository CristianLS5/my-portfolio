import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarioComponent } from '../mario/mario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MarioComponent, CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent {
  @Input() isDarkMode!: boolean;
  @Output() toggleDarkMode = new EventEmitter<void>();
}
