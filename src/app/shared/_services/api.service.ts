import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import { ApiResponse } from '../models/general';
import { BlogPost } from 'src/app/features/blog-post/models/blog-post.model';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {
  }

  getAll(): Observable<ApiResponse<BlogPost[]>> {
    return this.httpService.get('/api/blogposts')
      .pipe(map(data => data as ApiResponse<BlogPost[]>));
  }

  getUser(id: number): Observable<User> {
    return this.httpService.get('/users/' + id);
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
