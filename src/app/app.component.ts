import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DarkModeService } from './services/dark-mode.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private darkModeSubscription: Subscription | undefined;

  constructor(
    private darkModeService: DarkModeService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    );
  }

  ngOnDestroy() {
    this.darkModeSubscription?.unsubscribe();
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
