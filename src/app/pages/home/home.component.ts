/*
============================================
; Title: home.component.ts
; Author: Professor Krasso
; Date:   22 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: home component page
;===========================================
*/

//These are files being imported from external files
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LineItem } from 'src/app/shared/interfaces/line-item.interface';
import { ServiceRepairItem } from 'src/app/shared/interfaces/service-repair-item.interface';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  username: string;
  services: ServiceRepairItem
  lineItems: LineItem[];

  constructor(private cookieService: CookieService, private fb: FormBuilder, private dialog: MatDialog,
    private router: Route, private serviceRepairService: ServiceRepairService, private invoiceService: InvoiceService) {

    //Gets the username
    this.username = this.cookieService.get('sessionuser')

    this.services = this.serviceRepairService.getServiceRepairItems();

     }


  ngOnInit() {
  }

}
