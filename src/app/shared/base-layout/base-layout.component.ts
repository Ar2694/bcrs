/*
============================================
; Title: base-layout.component.ts
; Author: Professor Krasso
; Date:   16 April 2021
; Modified by: Karina Alvarez
; Description: base layout
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  //Once user logs into the system, the signOut() function will allow them to sign out of the site
  //user will be redirected to the sign-in page
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }

}
