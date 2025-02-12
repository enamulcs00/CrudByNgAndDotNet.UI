import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { StoreRepoService } from 'src/app/shared/_services/store-repo-service';
import { Observable, take } from 'rxjs';
import { blogPostActions } from 'src/app/core/ngrx-store';
import { endPoints } from 'src/app/shared/endpoints';
import { IGetApi } from 'src/app/shared/models/general';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
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
                    featureName:'blogPost'
                  }
    this.blogs$ = this.serv.getAll(param);
    this.blogs$.pipe(take(1)).subscribe(res=>{
      console.log("RESSSS", res);
      
    })
  }
  
}
