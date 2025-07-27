import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';
import { IGetApi } from 'src/app/core/models/general';
import { blogPostActions } from 'src/app/core/ngrx-store';
import { endPoints } from 'src/app/core/routes/endpoints';
import { StoreRepoService } from 'src/app/core';
import { EmptyStateComponent } from 'src/app/shared';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
     imports: [CommonModule, EmptyStateComponent, RouterModule],
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]>;
  constructor( private serv:StoreRepoService<BlogPost>) {

  }
  ngOnInit(): void {
    let param:IGetApi<BlogPost> = {
                    endPoint:endPoints.blogPost.url,
                    actionName:blogPostActions,
                    force:false,
                    featureName:'blogPost',
                  }
    this.blogs$ = this.serv.getAll(param);
  }
  
}
