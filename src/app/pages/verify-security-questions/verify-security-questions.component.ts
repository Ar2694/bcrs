/*
============================================
; Title:  Verify Security Questions
; Author: Professor Krasso
; Date:   24 April 2021
; Modified by: Douglas Jenkins
; Description: creating the Verify Security Questions page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
// string values created for the questions
export class VerifySecurityQuestionsComponent implements OnInit {
  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.username = this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);

    /**
     * when valid username is entered, the three question this previously selected
     * when creating an account will be get from the database
     * so that the user can answer them before changing password.
     */
    this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res => {
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
    }, err => {
      console.log(err)
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].questionText;
      this.question2 = this.selectedSecurityQuestions[1].questionText;
      this.question3 = this.selectedSecurityQuestions[2].questionText;

      // displays the security question that is created
      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    });
  }

  /**
   * Three security question gotten from database based on username
   */
  ngOnInit() {
    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }

  verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

    // verify the username and security question
    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3
    }).subscribe(res => {
      console.log(res);
      if (res['message'] === 'success') {
        this.router.navigate(['/session/reset-password'], {
        queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true });
      } else {
        console.log('Unable to verify security question answers');
      }
    });
  }
}
