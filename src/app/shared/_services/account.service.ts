import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/general';




@Injectable({ providedIn: 'root' })
export class AccountService {
   

    constructor(
        private http:HttpClient
    ) {
      
    }
    getAllUsers() : Observable<ApiResponse<User[]>> {
        return this.http.get<ApiResponse<User[]>>(`${environment.apiBaseUrl}/api/Users`).pipe(map(
            data => data as ApiResponse<User[]>
        ));
      }
}