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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder,
              private http: HttpClient) { }


  /**
   * Sign-in form with username and password specifying the requirements to login to the homepage
   */
  ngOnInit(): void {
    this.signinForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-z]*$')])]
    })
  }

  /**
   * signin function needed to help the employee login with a valid username and password
   * If an invalid username is entered, the else..if will handle this by showing a warning or error message.
   */
  signin() {
    const username = this.signinForm.controls.username.value;
    const password = this.signinForm.controls.password.value;

    this.http.post('/api/session/signin', { username, password }).subscribe(res => {
      console.log(res['data']);

      /**
       * This will authenticate user to grant them access to homepage
       */
      if (res['data'].username)
      {
        this.cookieService.set('sessionuser', res['data'].username, 1);
        this.router.navigate(['/']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message
    })
  }
}
