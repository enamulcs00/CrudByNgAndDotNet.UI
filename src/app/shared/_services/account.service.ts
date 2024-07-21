import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';




@Injectable({ providedIn: 'root' })
export class AccountService {
   

    constructor(
        private http:HttpClient
    ) {
      
    }
    getAllUsers() : Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiBaseUrl}/api/Users`);
      }
}