import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  aboutText =
    signal(`Experienced working with teams to produce impactful, leading-edge websites that
    engage customers and deliver business results. Well-versed in design standards
    and user preferences. Possesses knowledge of Angular with ability to quickly learn
    new technologies. Demonstrated success in identifying and resolving code issues.`);

  imageUrl = signal('assets/images/profile-animated.svg');
}
