import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private ngxService: NgxUiLoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.ngxService.start();

    const authRequest = request.clone({
      withCredentials: true
    });

    return next.handle(authRequest)
      .pipe(finalize(() => this.ngxService.stop()));
  }
}
