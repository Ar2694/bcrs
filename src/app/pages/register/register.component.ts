/*
============================================
; Title:  register.component.ts
; Author: Professor Krasso
; Date:   22 April 2021
; Modified by: Karina Alvarez
; Description: Registration application using a stepper
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  SecurityQuestions: SecurityQuestion[];
  form: FormGroup;
  registrationForm: FormGroup;
  errorMessage: string;


  constructor(private http: HttpClient, private router: Router,
              private fb: FormBuilder, private cookieService: CookieService) {

    this.http.get('/api/security-questions').subscribe(res => {
      this.SecurityQuestions = res['data'];
    }, err => {
      console.log(err);
    })
  }

  /**
   * Registration Form
   * stepper
   */
  ngOnInit() {
    this.registrationForm = new FormGroup({
      /**
       * contact information when user registers for new account
       */
      contactInformation: new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.compose([Validators.required,
          Validators.pattern('^[0-9]*$')])),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
      }),
      /**
       * security questions and answers for user to choose
       * when registering for a new account
       */
      SecurityQuestions: new FormGroup({
        SecurityQuestion1: new FormControl(null, Validators.required),
        SecurityQuestion2: new FormControl(null, Validators.required),
        SecurityQuestion3: new FormControl(null, Validators.required),
        AnswerToSecurityQuestion1: new FormControl(null, Validators.required),
        AnswerToSecurityQuestion2: new FormControl(null, Validators.required),
        AnswerToSecurityQuestion3: new FormControl(null, Validators.required),
      }),
      credentials: new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.compose([Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$')]))
      })
    });
  }

  /**
   * Register Form that will hold all the fields
   * within each form defined above
   * @param form
   */
  register(form) {
    const contactInformation = form.contactInformation;
    const SecurityQuestions = form.SecurityQuestions;
    const credentials = form.credentials;

    /**
     * array of object literal with question and answer
     */
    const selectedSecurityQuestions = [
      {
        questionText: SecurityQuestions.SecurityQuestion1,
        answerText: SecurityQuestions.AnswerToSecurityQuestion1
      },
      {
        questionText: SecurityQuestions.SecurityQuestion2,
        answerText: SecurityQuestions.AnswerToSecurityQuestion2
      },
      {
        questionText: SecurityQuestions.SecurityQuestion3,
        answerText: SecurityQuestions.AnswerToSecurityQuestion3
      }
    ];

    console.log(selectedSecurityQuestions);

    /**
     * All registration data is added
     */
    this.http.post('/api/session/register', {
      username: credentials.username,
      password: credentials.password,
      firstname: contactInformation.firstname,
      lastname: contactInformation.lastname,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      selectedSecurityQuestions: selectedSecurityQuestions
    }).subscribe(res => {
      if(res['data']) {

      /**
       * user is authenticated and access is granted
       */
        this.cookieService.set('sessionuser', credentials.username, 1);
        this.router.navigate(['/']);
      }
      else {
        /**
         * user is not authenticated and access is denied
         * an error message is returned
         */
        this.errorMessage = res['message'];
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;
    });
  }
}
