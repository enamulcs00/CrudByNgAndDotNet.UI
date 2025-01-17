import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpService {
  private baseUrl = 'https://localhost:7226';

  constructor(private httpClient: HttpClient) {
  }

  get(url: string,obj?:object): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + url,obj);
  }
}
