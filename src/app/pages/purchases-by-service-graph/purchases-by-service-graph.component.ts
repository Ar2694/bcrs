/*
============================================
; Title:  role.create.component.html
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Douglas Jenkins, Karina Alvarez
; Description: Purchase by service graph
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {

  //calls for these values to be filled
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
  //this function calls the purchase graph API
    this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {

      //this will add the response data to the variable
      this.purchases = res['data'];

      //loos over the purchases and divides out the itemCount and services
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      //this builds the object for the prime bar graph
       this.data = {
        labels: this.labels,
        datasets: [
          //graph objects
          // colors where changed to represent our team
          {
            backgroundColor: [
              '#0e1a40',
              '#795548',
              '#1A237E',
              '#946b2d',
              '#222f5b',
              '#5d5d5d',
              '#000000',
            ],
            hoverBackgroundColor: [
              '#0e1a40',
              '#795548',
              '#1A237E',
              '#946b2d',
              '#222f5b',
              '#5d5d5d',
              '#000000',
            ],
            data: this.itemCount
          }
        ]
      };

      console.log('Data Object');
      console.log(this.data);
    })
  }

  ngOnInit(): void {
  }

}
