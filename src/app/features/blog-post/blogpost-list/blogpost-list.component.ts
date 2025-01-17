import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { ApiResponse } from 'src/app/shared/models/general';
import { StoreRepoService } from 'src/app/shared/_services';

@Component({
    selector: 'app-blogpost-list',
    templateUrl: './blogpost-list.component.html',
    styleUrls: ['./blogpost-list.component.css'],
    standalone: false
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;

  constructor(private serv: StoreRepoService) {

  }

  ngOnInit(): void {
    // get all blog posts from API
    this.blogPosts$ = this.serv.getUserList();
  }

}
