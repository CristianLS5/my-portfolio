import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

interface StringItem {
  text: string;
  shortText?: string;
}

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [NgxTypedWriterModule, CommonModule],
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
})
export class TypewriterComponent {
  strings = input<StringItem[]>([]);

  getTexts = (): string[] => this.strings().map((item) => item.text);

  getMobileTexts = (): string[] =>
    this.strings().map((item) => item.shortText || item.text);
}
