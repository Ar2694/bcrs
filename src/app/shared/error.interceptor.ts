/*
============================================
; Title:  error.interceptor.ts
; Author: Professor Krasso
; Date:   22 April 2021
; Modified by: Karina Alvarez
; Description: Error interceptor for 404 and 500
;===========================================
*/

//These are files being imported from external files
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  /**
   *
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      //if function to help handle 404 error
      if ([404].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/404'])
      }

      //if function to help handle 500 error
      if ([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/500'])
      }

      /**
       * If the above two if statements are not satisfied
       * the following function will return
       */
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
