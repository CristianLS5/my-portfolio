import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.interface';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  private articleService = inject(ArticleService);
  articles: Article[] = [];

  ngOnInit() {
    this.articleService
      .getArticles()
      .subscribe((articles) => (this.articles = articles));
  }
}
