import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBlogResponse } from 'src/app/shared/interfaces/blog.interface';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-category-articles',
  templateUrl: './category-articles.component.html',
  styleUrls: ['./category-articles.component.scss']
})
export class CategoryArticlesComponent implements OnInit, OnDestroy {

  public articles: Array<IBlogResponse>=[]
  private subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private article: ArticleService,
    private route: Router,
    private activatedRoute: ActivatedRoute,) {
      const routeStream$ = this.route.events.subscribe( event => {
        if(event instanceof NavigationEnd){
          const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
          this.loadCategoryArticles(categoryName as string)
        }
      })
      this.subscription.add(routeStream$);
   }

  ngOnInit(): void {}

    loadCategoryArticles(categoryName: string):void{
      this.article.getByCategory(categoryName).subscribe(data => {
        this.categoryService.articles$.next({[categoryName]: data})
        this.subscribeOnArticleCategory(categoryName as string)
      },err => {
        console.log(err);
      })
    } 

    private subscribeOnArticleCategory(categoryName: string){
      const articlesStream$ = this.categoryService.articles$.subscribe( data => {
        this.articles = data[categoryName]
      })
      this.subscription.add(articlesStream$);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  

}
