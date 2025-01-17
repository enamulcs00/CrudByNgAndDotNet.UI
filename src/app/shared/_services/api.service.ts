import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import { ApiResponse, IServiceParams } from '../models/general';
import { BlogPost } from 'src/app/features/blog-post/models/blog-post.model';
import { Category } from 'src/app/features/category/models/category.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {
  }

  getAll(): Observable<ApiResponse<BlogPost[]>> {
    return this.httpService.get('/api/blogposts')
      .pipe(map(data => data as ApiResponse<BlogPost[]>));
  }
  getAllCategories(obj:IServiceParams): Observable<ApiResponse<Category[]>> {
    let params = new HttpParams();

    if (obj.query) {
      params = params.set('query', obj.query)
    }

    if (obj.sortBy) {
      params = params.set('sortBy', obj.sortBy)
    }

    if (obj.sortDirection) {
      params = params.set('sortDirection', obj.sortDirection)
    }

    if (obj.pageNumber) {
      params = params.set('pageNumber', obj.pageNumber)
    }

    if (obj.pageSize) {
      params = params.set('pageSize', obj.pageSize)
    }
    return this.httpService.get(`/api/categories`, {
      params: params
    })
    .pipe(map(data=>data as ApiResponse<Category[]>));
  }
  getUser(id: string): Observable<ApiResponse<BlogPost>> {
    return this.httpService.get('/api/blogposts/' + id)
    .pipe(map(data => data as ApiResponse<BlogPost>));
  }

  getAllPost(): Observable<any[]> {
    const data: any[] = [{
      title: 'post 1', id: 1,
      comments: [{id: 11, description: 'comment 1'}, {id: 13, description: 'comment 2'}]
    }, {
      title: 'post 2', id: 2,
      comments: [{id: 121, description: 'comment 3'}, {id: 15, description: 'comment 4'}]
    }];
    return new Observable(observer => {
      observer.next(data);
    });
  }
}
