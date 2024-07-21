import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { AccountService } from '../shared/_services';
import { Observable } from 'rxjs';



@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users$?: Observable<User[]>;

    constructor(private _service: AccountService) {
  
    }
  
    ngOnInit(): void {
      // get all blog posts from API
      this.users$ = this._service.getAllUsers();
    }
}