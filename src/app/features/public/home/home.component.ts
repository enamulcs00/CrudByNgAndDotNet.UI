import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { ApiResponse } from 'src/app/shared/models/general';
import { YoutubeRepository } from 'src/app/shared/_services/store-repo-service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;
  constructor(private blogPostService: BlogPostService, private serv:YoutubeRepository) {

  }
  ngOnInit(): void {
    this.blogs$ = this.serv.getUserList();
  }
}
