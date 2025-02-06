import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { StoreRepoService } from 'src/app/shared/_services/store-repo-service';
import { Store } from '@ngrx/store';
import { GenericService } from 'src/app/shared/_services/store.service';
import { endPoints } from 'src/app/shared/endpoints';

interface Category {
  id: string;
  name: string;
}
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  categories$?: Observable<Category[]>;

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Dummy API
  private entityName = 'enamul';
  blogs$?: Observable<BlogPost[]>;
  constructor( private serv:StoreRepoService,private genericService: GenericService<Category>) {

  }
  ngOnInit(): void {
    this.blogs$ = this.serv.getUserList();
    this.loadCategories();
  }
  loadCategories(): void {
    this.categories$ = this.genericService.getAll(this.apiUrl, this.entityName);
    this.categories$.subscribe(res=>{
      console.log("Resp", res);
      
    })
  }
}
