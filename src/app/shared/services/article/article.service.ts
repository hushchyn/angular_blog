import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogResponse } from '../../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = environment.BACKEND_URL
  private api = {articles: `${this.url}/articles`}

  constructor(private http: HttpClient) { }

  getAll():Observable<IBlogResponse[]>{
    return this.http.get<IBlogResponse[]>(this.api.articles)
  }

  getOne(id:number):Observable<IBlogResponse>{
    return this.http.get<IBlogResponse>(`${this.api.articles}/${id}`)
  }

  getByCategory(categoryName:string): Observable<IBlogResponse[]>{
    return this.http.get<IBlogResponse[]>(`${this.api.articles}?category.name=${categoryName}`)
  }

  create(article:IBlogResponse): Observable<void>{
    return this.http.post<void>(this.api.articles, article)
  }

  update(article: IBlogResponse, id:number): Observable<void>{
    return this.http.patch<void>(`${this.api.articles}/${id}`, article)
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.api.articles}/${id}`)
  }

}
