import { NgClass } from '@angular/common';
import { Component, input, signal, effect } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-animated-text',
  standalone: true,
  imports: [NgClass],
  templateUrl: './animated-text.component.html',
  animations: [
    trigger('slideIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-100%)' }),
            stagger(1000, [
              animate(
                '1000ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AnimatedTextComponent {
  words = input<string[]>([]);
  visibleWords = signal<string[]>([]);

  constructor() {
    effect(() => {
      this.animateWords(this.words());
    });
  }

  private animateWords(words: string[]) {
    let index = 0;
    const interval = setInterval(() => {
      if (index < words.length) {
        this.visibleWords.update((current) => [...current, words[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }
}
