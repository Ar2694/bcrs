/*
============================================
; Title: reset-password.component.ts
; Author: Professor Krasso
; Date: 25 April 2021
; Modified by: Arlix Sorto
; Description: Reset password component
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isAuthenticated: string;
  username: string;
  form: FormGroup;

  //Constructor
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService) { 
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required,  Validators.pattern('^(?=.*?[A-Z])(?=.*?[0-9]).{6,}$')])]
    })
  }

/**
 * Reset the user password function
 */
  resetPassword(){
    this.http.post(`/api/session/users/${this.username}/reset-password`,{
      password: this.form.controls['password'].value
    }).subscribe(res=>{
      /**
       * User is authenticated and we can grant them access
       */
      this.cookieService.set('sessionuser', this.username, 1);
      this.router.navigate(['/']);
    }, err =>{
      console.log(err);
    })
  }
}
