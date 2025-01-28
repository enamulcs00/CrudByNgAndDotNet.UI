import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { CrudActions } from 'src/app/store/dummy-store/action';

const userActions = new CrudActions<User>('User');
@Injectable()
export class HttpService {
  private baseUrl = 'https://localhost:7226';

  constructor(private httpClient: HttpClient,  private store: Store) {
  }

  get(url: string,obj?:object): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + url,obj);
  }
  loadUsers() {
    this.httpClient.get<User[]>('https://dummyapi/users').subscribe(
      (data) => this.store.dispatch(userActions.loadSuccess({ data })),
      (error) => this.store.dispatch(userActions.loadFailure({ error }))
    );
  }
}
