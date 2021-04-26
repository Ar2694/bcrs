/*
============================================
; Title: internal-server-error.component.ts
; Author: Professor Krasso
; Date:   22 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: 500 error page
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
