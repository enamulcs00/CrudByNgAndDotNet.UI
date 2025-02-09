import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreRepoService } from 'src/app/shared/_services';
import { GenericService } from 'src/app/shared/_services/store.service';
import { IPost } from 'src/app/shared/models/general';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  standalone: false
})
export class PostsComponent implements OnInit {
posts$?: Observable<IPost[]>;

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Dummy API
  private entityName = 'enamul';

    constructor(private _service:StoreRepoService <IPost>,private genericService: GenericService<IPost>) {
  
    }
  
    ngOnInit(): void {
      // get all blog posts from API
      this.loadPosts()
    }
    loadPosts(): void {
      this.posts$ = this.genericService.getAll(this.apiUrl, this.entityName);
      this.posts$?.subscribe(res=>{
        console.log("Resp", res);
        
      })
    }
    deletePost(id:string):void{
      console.log('id');
      
this.genericService.delete(this.apiUrl, this.entityName,id);
// this.loadPosts()
    }
}
