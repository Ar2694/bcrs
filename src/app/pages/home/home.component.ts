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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Invoice } from 'src/app/shared/interfaces/invoice.interface';
import { LineItem } from 'src/app/shared/interfaces/line-item.interface';
import { InvoiceSummaryDialogComponent } from 'src/app/dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { ServiceRepairService } from 'src/app/shared/services/service-repair.service';
import { ServiceRepairItem } from 'src/app/shared/interfaces/service-repair-item.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  username: string;
  services: ServiceRepairItem[];
  lineItems: LineItem[];

  constructor(private cookieService: CookieService, private fb: FormBuilder, private dialog: MatDialog,
    private router: Router, private serviceRepairService: ServiceRepairService, private invoiceService: InvoiceService) {

    //Gets the username
    this.username = this.cookieService.get('sessionuser');

    this.services = this.serviceRepairService.getServiceRepairItems();

     }


     /**
      *
      */
  ngOnInit() {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
  }

  /**
   *
   * @param form
   *
   */
  submit(form) {
    console.log(form);

    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) {
        selectedServiceIds.push ({
          id: key
        });
      }
    }

    this.lineItems = [];

    /**
     * Building the invoice object
     */
    for (const savedService of this.services) {
      for (const selectedService of selectedServiceIds) {
        if (savedService.id === selectedService.id) {
          this.lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }

    console.log(this.lineItems);

    /**
     * Addition of each item with a total
     */
    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor * 50;
    const lineItemTotal = this.lineItems.reduce((prev, cur) => prev + cur.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;

    const invoice = {
      username: this.username,
      lineItem: this.lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      orderDate: new Date()
    } as Invoice;

    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice has been saved');

        this.invoiceService.createInvoice(invoice.username, invoice).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        })
      }
    })

  }

}
