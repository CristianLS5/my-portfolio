import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDarkMode = signal(false);

  constructor() {
    // Check if dark mode was previously set
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      this.isDarkMode.set(savedMode === 'true');
    }

    effect(() => {
      document.body.classList.toggle('dark', this.isDarkMode());
      localStorage.setItem('darkMode', this.isDarkMode().toString());
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update((isDark) => !isDark);
  }
}
