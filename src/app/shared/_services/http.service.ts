import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpService {
  private baseUrl = 'https://localhost:7226';

  constructor(private httpClient: HttpClient) {
  }

  get(url: string, ): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + url);
  }
}
