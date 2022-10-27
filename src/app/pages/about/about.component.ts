/*
============================================
; Title: about.component.ts
; Author: Professor Krasso
; Date:   22 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: About component
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
