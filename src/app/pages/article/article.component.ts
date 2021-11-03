import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBlogResponse } from 'src/app/shared/interfaces/blog.interface';
import { ArticleService } from 'src/app/shared/services/article/article.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public currentArticle!: IBlogResponse

  constructor(  
    private activatedRoute: ActivatedRoute,
    private article: ArticleService,
    public location: Location
    ) { }

  ngOnInit(): void {
    this.loadArticle()
  }

  loadArticle():void{
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.article.getOne(id).subscribe(data => {
      this.currentArticle = data
      console.log(data);
    },err => {
      console.log(err);
      
    })
  }

}
