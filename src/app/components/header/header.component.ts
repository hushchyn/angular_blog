import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sideNav = false;
  categories: Array<ICategoryResponse> = [];
  formArticle!: FormGroup 
  currentRoute = '';


  constructor(
    private categoryService: CategoryService,
    private article: ArticleService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.initForm();
  }

  initForm():void{
    this.formArticle = this.fb.group({
      category: [null,Validators.required],
      imgPath: [null ,Validators.required],
      title: [null,Validators.required],
      description: [null,Validators.required]
    })
  }

  loadCategories():void{
    this.categoryService.gatAll().subscribe( data => {
      this.categories = data
    }, err =>{
      console.log(err);
    })
  }

  addArtcile():void{
    this.article.create(this.formArticle.value).subscribe((article)=> {
        this.categoryService.updateArticles(this.formArticle.get('category')?.value.name, article)
        this.formArticle.reset()
    }, err => {
      console.log(err);
    })

  }

}
