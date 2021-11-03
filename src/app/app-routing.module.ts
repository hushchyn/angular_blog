import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CategoryArticlesComponent } from './pages/category-articles/category-articles.component';
import { ArticleComponent } from './pages/article/article.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':category', component: CategoryArticlesComponent },
  {path: ':category/:id',component: ArticleComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
