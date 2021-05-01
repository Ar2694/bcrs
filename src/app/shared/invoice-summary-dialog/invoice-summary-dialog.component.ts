/*
============================================
; Title: invoice-summary
; Author: Professor Krasso
; Date:   30 April 2021
; Modified by: Karina Alvarez
; Description: Invoice Summary
;===========================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Invoice } from "../../shared/interfaces/invoice.interface";

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
//calls over the invoice
invoice: Invoice

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.invoice = data.invoice;
   }

  ngOnInit(): void {
  }

}
