import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/models/general';
import { StoreRepoService } from '../shared/_services';



@Component({
    templateUrl: 'list.component.html',
    standalone: false
})
export class ListComponent implements OnInit {
    users$?: Observable<User[]>;

    constructor(private _service:StoreRepoService ) {
  
    }
  
    ngOnInit(): void {
      // get all blog posts from API
      this.users$ = this._service.getRegisterdUsers();
    }
}