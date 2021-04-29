/*
============================================
; Title: security-question-list.component.ts
; Author: Professor Krasso
; Date:   18 April 2021
; Modified by: Karina Alvarez
; Description: security question page
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question.interface';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {

    this.securityQuestionService.findAllSecurityQuestion().subscribe( res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

  /**
   *
   * @param recordId
   * Delete security question
   * it will prompt before deleting
   */
  delete(recordId: string) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete security question ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm') {
        this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res => {
          console.log('Security question deleted');
          this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
        })
      }
    });
  }
}
