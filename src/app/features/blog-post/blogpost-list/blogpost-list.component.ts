import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { ApiResponse, IGetApi } from 'src/app/shared/models/general';
import { StoreRepoService } from 'src/app/shared/_services';
import { blogPostActions } from 'src/app/core/ngrx-store';
import { endPoints } from 'src/app/shared/endpoints';

@Component({
    selector: 'app-blogpost-list',
    templateUrl: './blogpost-list.component.html',
    styleUrls: ['./blogpost-list.component.css'],
    standalone: false
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;

  constructor(private serv: StoreRepoService<BlogPost>) {

  }

  ngOnInit(): void {
    // get all blog posts from API
     let param:IGetApi<BlogPost> = {
              endPoint:endPoints.blogPost.url,
              actionName:blogPostActions,
              force:false,
              featureName:'blogPost'
            }
    this.blogPosts$ = this.serv.getAll(param);
  }

}
