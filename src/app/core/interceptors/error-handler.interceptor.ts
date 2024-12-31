import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NgxToastrService } from 'src/app/shared/_services';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private ngxToastrService: NgxToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {        
        let errorMessage = this.handleError(error);
        this.ngxToastrService.show(errorMessage,'toast-error',"Error")
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  private handleError = (error: HttpErrorResponse) : string => {    
    if(error.status === 404){
      return this.handleNotFound(error);
    }
    else if(error.status === 400){
      return this.handleBadRequest(error);
    }
    else if(error.status === 401) {
      return this.handleUnauthorized(error);
    }
    else if(error.status === 403) {
      return this.handleForbidden(error);
    }
    else if(error.status === 500) {
      return 'Internal server error';
    }
    else {
      return 'Unknown Error';
    }
  }

  private handleForbidden = (error: HttpErrorResponse) => {    
    return error.error ? error?.error?.message : error.message;
  }

  private handleNotFound = (error: HttpErrorResponse): string => {
 return error.error ? error?.error?.message : error.message;
  }
  
  private handleUnauthorized = (error: HttpErrorResponse) => {
      return error.error ? error?.error?.message : error.message;
  }

  private handleBadRequest = (error: HttpErrorResponse): string => {
    return error.error ? error?.error?.message : error.message;
  }
}
