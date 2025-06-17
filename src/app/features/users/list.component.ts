import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreRepoService } from 'src/app/core';
import { IGetApi, User } from 'src/app/core/models/general';
import { userActions } from 'src/app/core/ngrx-store';
import { endPoints } from 'src/app/core/routes/endpoints';




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
       let param:IGetApi<User> = {
                endPoint:endPoints.users.url,
                actionName:userActions,
                force:false,
                featureName:'users',
              }
      this.users$ = this._service.getAll(param);
    }
    deleteUser(id:string):void {      
      this._service.delete(id , userActions,endPoints.users.url);
      // this.users$ = this._service.getAll(endPoints.users.url , false , userActions, 'users');

    }
}