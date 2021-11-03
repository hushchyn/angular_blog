import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogResponse } from '../../interfaces/blog.interface';
import { ICategoryResponse } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  articles$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentRoute$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  private url = environment.BACKEND_URL
  private api = { category: `${this.url}/category`}

  constructor(private http: HttpClient) { }

  gatAll(): Observable<ICategoryResponse[]>{
    return this.http.get<ICategoryResponse[]>(this.api.category)
  }

  updateArticles(type: string, article: any){
    if(!this.articles$.getValue()[type]){
      this.articles$.getValue()[type] = [];
    }
    this.articles$.getValue()[type].push(article);
    this.articles$.getValue()['allArticles'].push(article);
    this.articles$.next(this.articles$.getValue());
  }
}
