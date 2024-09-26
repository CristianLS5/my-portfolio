import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  signal,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-mario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mario.component.html',
  styles: [
    `
      .star {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        animation: twinkle 1s infinite alternate;
      }
      @keyframes twinkle {
        0% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class MarioComponent implements AfterViewInit {
  @Input() isDarkMode: boolean = false;
  @ViewChild('gameContainer') gameContainer!: ElementRef;
  @ViewChild('mario') mario!: ElementRef;

  obstacles = signal<Array<{ position: number; emoji: string }>>([]);
  birds = signal<Array<{ x: number; y: number }>>([]);
  clouds = signal<Array<{ x: number; y: number; size: number }>>([]);
  stars = signal<Array<{ x: number; y: number; size: number }>>([]);

  private animationFrame: number = 0;
  private marioY: number = 0;
  private jumping: boolean = false;

  ngAfterViewInit() {
    this.initGame();
  }

  private initGame() {
    const containerWidth = this.gameContainer.nativeElement.offsetWidth;
    const containerHeight = this.gameContainer.nativeElement.offsetHeight;
    const obstacleEmojis = ['🌵', '🍄', '👾']; // Using emojis instead of images

    // Initialize obstacles
    for (let i = 0; i < 5; i++) {
      this.obstacles.update((obstacles) => [
        ...obstacles,
        {
          position: containerWidth + i * 300,
          emoji:
            obstacleEmojis[Math.floor(Math.random() * obstacleEmojis.length)],
        },
      ]);
    }

    // Initialize birds
    for (let i = 0; i < 3; i++) {
      this.birds.update((birds) => [
        ...birds,
        {
          x: Math.random() * containerWidth,
          y: Math.random() * (containerHeight / 2),
        },
      ]);
    }

    // Initialize clouds
    for (let i = 0; i < 4; i++) {
      this.clouds.update((clouds) => [
        ...clouds,
        {
          x: Math.random() * containerWidth,
          y: Math.random() * (containerHeight / 3),
          size: 50 + Math.random() * 50,
        },
      ]);
    }

    // Initialize stars
    for (let i = 0; i < 50; i++) {
      this.stars.update((stars) => [
        ...stars,
        {
          x: Math.random() * containerWidth,
          y: Math.random() * (containerHeight * 0.7),
          size: 1 + Math.random() * 2,
        },
      ]);
    }

    this.gameLoop();
  }

  private gameLoop() {
    const containerWidth = this.gameContainer.nativeElement.offsetWidth;

    // Move obstacles
    this.obstacles.update((obstacles) =>
      obstacles
        .map((obstacle) => ({
          ...obstacle,
          position: obstacle.position - 5,
        }))
        .map((obstacle) =>
          obstacle.position < -64
            ? { ...obstacle, position: containerWidth }
            : obstacle
        )
    );

    // Move birds
    this.birds.update((birds) =>
      birds.map((bird) => ({
        ...bird,
        x: (bird.x - 2 + containerWidth) % containerWidth,
      }))
    );

    // Move clouds
    this.clouds.update((clouds) =>
      clouds.map((cloud) => ({
        ...cloud,
        x: (cloud.x - 0.5 + containerWidth) % containerWidth,
      }))
    );

    // Mario jump logic
    if (this.jumping) {
      this.marioY += 5;
      if (this.marioY > 100) {
        this.jumping = false;
      }
    } else if (this.marioY > 0) {
      this.marioY -= 5;
    } else if (Math.random() < 0.02) {
      // 2% chance to jump each frame
      this.jumping = true;
    }

    if (this.mario && this.mario.nativeElement) {
      this.mario.nativeElement.style.bottom = `${this.marioY + 96}px`; // Adjusted to account for ground height
    }

    this.animationFrame = requestAnimationFrame(() => this.gameLoop());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
  }
}
