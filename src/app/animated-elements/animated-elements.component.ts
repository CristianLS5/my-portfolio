import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-animated-elements',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './animated-elements.component.html',
  animations: [
    trigger('slideInLeft', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(-250%)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', animate('1500ms ease-out')),
    ]),
  ],
})
export class AnimatedElementsComponent implements OnInit {
  @Input() icons: IconDefinition[] = [];
  visibleIcons: IconDefinition[] = [];

  ngOnInit() {
    this.animateIcons();
  }

  private animateIcons() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.icons.length) {
        this.visibleIcons.push(this.icons[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // 2 seconds interval between elements
  }
}
