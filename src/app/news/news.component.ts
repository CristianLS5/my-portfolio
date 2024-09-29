import { Component, OnInit } from '@angular/core';
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
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles(10).subscribe(
      (articles) => (this.articles = articles),
      (error) => console.error('Error fetching GitHub releases:', error)
    );
  }
}
