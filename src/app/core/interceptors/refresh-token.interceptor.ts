import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { HttpService } from '../_services/http.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private httpService: HttpService,
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshSubject.next(false);

          return this.httpService.post('/api/auth/refresh', {},{ withCredentials: true }).pipe(
            switchMap(() => {
              this.isRefreshing = false;
              this.refreshSubject.next(true);

              return next.handle(
                request.clone({ withCredentials: true })
              ).pipe(
                catchError(err => {
                  if (err.status === 401) {
                    this.auth.logout();
                  }
                  return throwError(() => err);
                })
              );
            }),
            catchError(() => {
              this.isRefreshing = false;
              this.auth.logout();
              return throwError(() => error);
            })
          );
        }

        if (error.status === 401 && this.isRefreshing) {
          return this.refreshSubject.pipe(
            filter(v => v === true),
            take(1),
            switchMap(() =>
              next.handle(request.clone({ withCredentials: true }))
            )
          );
        }

        return throwError(() => error);
      })
    );
  }
}