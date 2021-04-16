/*
============================================
; Title:  user-api.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: User APIs
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }


  /**
   * Sign-in form with username and password specifying the requirements to login to the homepage
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-z A-Z + $')])]
    })
  }

  /**
   * Sign-in button function
   */
  signin() {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    this.http.post('/api/session/signin', { userName, password }).subscribe(res => {
      console.log(res['data']);

      /**
       * This will authenticate user to grant them access to homepage
       */
      if (res['data'].userName) {
        this.cookieService.set('sessionuser', res['data'].userName, 1);
        this.router.navigate(['/']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message
    })
  }
}
