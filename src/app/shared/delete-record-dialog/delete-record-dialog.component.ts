/*
============================================
; Title: user-list.component.ts
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Karina Alvarez
; Description: User List component
;===========================================
*/

//These are files being imported from external files
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record-dialog',
  templateUrl: './delete-record-dialog.component.html',
  styleUrls: ['./delete-record-dialog.component.css']
})
export class DeleteRecordDialogComponent implements OnInit {

  username: string;
  dialogHeader: string;
  dialogBody: string

  //creating the base for the delete dialog
  constructor(private dialogRef: MatDialogRef<DeleteRecordDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.username = data.username;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit(): void {
  }

}
