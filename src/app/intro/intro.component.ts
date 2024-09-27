import { Component, OnInit, OnDestroy } from '@angular/core';
import { MarioComponent } from '../mario/mario.component';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MarioComponent, CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private darkModeSubscription: Subscription | undefined;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );
  }

  ngOnDestroy() {
    this.darkModeSubscription?.unsubscribe();
  }
}
