/*
============================================
; Title: security-question-details.component.ts
; Author: Professor Krasso
; Date:   18 April 2021
; Modified by: Karina Alvarez
; Description: security question details page
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';
import { SecurityQuestionService } from 'src/app/shared/security-question.service';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {

  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder,
    private router: Router, private securityQuestionService: SecurityQuestionService) {

    this.questionId = this.route.snapshot.paramMap.get('questionId');

    // Finds security question by Id
    this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res => {
          this.question = res['data'];
        },(err) => {
          console.log(err);
        }, () => {
          this.form.controls.text.setValue(this.question.text);
        }
      );
  }

  /**
   * Validators for the SQ form
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

/**
 * Saving Security question function
 */
  saveQuestion() {
    const updatedSecurityQuestion = {} as SecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;

    //ERROR
    this.securityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe(res => {
        this.router.navigate(['/security-questions']);
      });
  }

  /**
   * Cancel Button
   */
  cancel() {
    this.router.navigate(['/security-questions']);
  }
}
