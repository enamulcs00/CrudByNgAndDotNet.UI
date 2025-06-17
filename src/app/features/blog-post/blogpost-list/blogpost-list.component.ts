import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { blogPostActions, endPoints, IGetApi, StoreRepoService } from 'src/app/core';


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
              featureName:'blogPost',
            }
    this.blogPosts$ = this.serv.getAll(param);
  }

}
