import { Component, input } from '@angular/core';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [NgxTypedWriterModule],
  templateUrl: './typewriter.component.html',
})
export class TypewriterComponent {
  strings = input<string[]>([]);
}
