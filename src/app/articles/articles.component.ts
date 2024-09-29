import {
  Component,
  Input,
  signal,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../models/article.interface';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  private articleService = inject(ArticleService);

  @Input() limit: number = 3;
  @Input() showMoreButton: boolean = false;

  articles = signal<Article[]>([]);
  displayedArticles = computed(() => this.articles().slice(0, this.limit));

  ngOnInit() {
    this.articleService
      .getArticles(this.limit)
      .subscribe((articles) => this.articles.set(articles));
  }

  loadMore() {
    this.limit += 3;
  }
}
