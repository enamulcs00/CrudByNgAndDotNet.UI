import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import { ApiResponse, BaseModel, IGetApi,  } from '../models/general';
import { BlogPost } from 'src/app/features/blog-post/models/blog-post.model';
import { Category } from 'src/app/features/category/models/category.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService<T extends BaseModel> {
  constructor(private httpService: HttpService) {
  }

  getAll(endPoint:string): Observable<ApiResponse<T[]>> {
    return this.httpService.get(endPoint)
      .pipe(map(data => data as ApiResponse<T[]>));
  }
  createRecord(endPoint:string,obj:T): Observable<ApiResponse<T>> {
    return this.httpService.post(endPoint,obj);
  }
  updateRecord(endPoint:string,obj:T): Observable<ApiResponse<T>> {
    return this.httpService.put(endPoint,obj);
  }
  deleteRecord(endPoint:string): Observable<ApiResponse<T>> {
    return this.httpService.delete(endPoint);
  }
  getAllCategories(obj:IGetApi<T>): Observable<ApiResponse<Category[]>> {
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
  getById(id: string,endPoint:string): Observable<ApiResponse<T>> {
    return this.httpService.get(endPoint + id)
    .pipe(map(data => data as ApiResponse<T>));
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
