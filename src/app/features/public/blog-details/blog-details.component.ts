import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { StoreRepoService } from 'src/app/shared/_services';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.css'],
    standalone: false
})
export class BlogDetailsComponent implements OnInit {
  objId: string | null = null;
  blogPost$? : Observable<BlogPost>;

  constructor(private route: ActivatedRoute, private srv:StoreRepoService) {

  }
  ngOnInit(): void {
    this.route.paramMap.pipe(take(1))
    .subscribe({
      next: (params) => {
        this.objId = params.get('url');
      }
    });
   // Fetch blog details by object id
    if (this.objId) {      
      this.blogPost$ = this.srv.getUserById(this.objId);
    }
  }
}
