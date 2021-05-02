/*
============================================
; Title:  role.create.component.html
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Douglas Jenkins
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
  // calls for these values to be filled
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    // This function calls the purchase graph API
    this.invoiceService.findPurchaseByServiceGraph().subscribe(res => {
      // this will add the response data to the variable
      this.purchases = res ['data'];

      //loops over the purchases and divides out the itemCount and services
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      // this builds the object for the prime bar graph
      this.data = {
        labels: this.labels,
        datasets: [
          // graph objects
          {
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#683FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#683FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            data: this.itemCount
          }
        ],
      }
      console.log('Data Object');
      console.log(this.data);
    })

  };

  ngOnInit(): void {
  }

}
