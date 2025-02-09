import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, User } from '../shared/models/general';
import { StoreRepoService } from '../shared/_services';
import { endPoints } from '../shared/endpoints';
import { userActions } from '../core/ngrx-store';



@Component({
    templateUrl: 'list.component.html',
    standalone: false
})
export class ListComponent implements OnInit {
    users$?: Observable<User[]>;

    constructor(private _service:StoreRepoService<User> ) {
  
    }
  
    ngOnInit(): void {
      // get all blog posts from API
      this.users$ = this._service.getAll(endPoints.users.url , false , userActions, 'users');
    }
}