import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { blogPostActions, endPoints, IGetApi, StoreRepoService } from 'src/app/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmptyStateComponent } from 'src/app/shared';


@Component({
    selector: 'app-blogpost-list',
    templateUrl: './blogpost-list.component.html',
    styleUrls: ['./blogpost-list.component.scss'],
    standalone: true,
    imports: [CommonModule,RouterModule, EmptyStateComponent]

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
