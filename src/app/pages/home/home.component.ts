import { Component, OnInit } from '@angular/core';
import { IBlogResponse } from 'src/app/shared/interfaces/blog.interface';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

public articles: Array<IBlogResponse>=[];

constructor(
  private article: ArticleService,
  private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
   this.loadArticle();
  }

  private loadArticle():void{
    this.article.getAll().subscribe(data => {
      this.categoryService.articles$.next({allArticles: data});
      this.subscribeOnArticleState()
    },err => {
      console.log(err);
    })
  }

  private subscribeOnArticleState(): void {
    this.categoryService.articles$.subscribe( (data) => {
      this.articles = data.allArticles;
    })
  }
 
}
