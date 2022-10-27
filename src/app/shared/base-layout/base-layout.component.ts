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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  assignment: string;
  userRole: string;

  constructor(private cookieService: CookieService, private router: Router,
    private roleService: RoleService) {
    this.assignment = "Bob's Computer Repair Shop";

    //This will allowed certain parts of the navigation bar to be hidden for users that are not admins
    this.roleService.findUserRole(this.cookieService.get('sessionuser')).subscribe(res => {
      this.userRole = res['data'].role;
    })
  }

  ngOnInit(): void { }

  //Once user logs into the system, the signOut() function will allow them to sign out of the site
  //user will be redirected to the sign-in page
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }

}
