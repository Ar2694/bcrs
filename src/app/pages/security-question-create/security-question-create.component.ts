/*
============================================
; Title:  base.response.js
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Douglas Jenkins
; Description: create security question page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionService } from './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // allows you to make a new security question

  create() {
    const newSecurityQuestion = {} as SecurityQuestion; newSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions']);
    }, err => {
        console.log(err);
    })
  }

  // when canceled you go back to security questions

  cancel() {
    this.router.navigate(['/security-questions']);
  }

}
