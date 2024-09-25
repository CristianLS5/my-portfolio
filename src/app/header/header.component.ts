import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  HostListener,
  ElementRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() isDarkMode!: boolean;
  @Output() toggleDarkMode = new EventEmitter<void>();
  showHeaderContent = signal(false);

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
      const introRect = introSection.getBoundingClientRect();
      this.showHeaderContent.set(introRect.bottom <= 0);
    }
  }
}
