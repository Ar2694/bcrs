/*
============================================
; Title:  auth.guard.ts
; Author: Professor Krasso
; Date:   16 April 2021
; Modified by: Karina Alvarez
; Description: authorization guard app
;===========================================
*/

//These are files being imported from external files
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService ) {}

  /**
   *
   * @param route
   * @param state
   * @returns true
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.cookieService.get('sessionuser');

    /**
     * if...else function to ensure if authenticated they will have access, if not, they will
     * be returned to signin page to input username and password again
     */
    if (isAuthenticated) {
      return true;
    }
    else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
