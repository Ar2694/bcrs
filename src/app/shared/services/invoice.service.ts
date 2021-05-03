/*
============================================
; Title: invoice.service.ts
; Author: Professor Krasso
; Date: 29 April 2021
; Modified by: Arlix Sorto
; Description: Invoice service file
;===========================================
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../interfaces/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @param username
   * @param invoice
   * @returns Post request to create a new invoice.
   */
  createInvoice(username: string, invoice: Invoice): Observable<any>{
    return this.http.post('/api/invoices/' + username, {
      username: username,
      lineItem: invoice.lineItem,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total
    });
  }

/**
   *
   * @returns Get request to retrieve all the invoices.
   */
  findPurchasesByServiceGraph(){
    return this.http.get('/api/invoices/purchases-graph');
  }
}
