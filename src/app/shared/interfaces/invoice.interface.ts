/*
============================================
; Title: -invoice.interface.ts
; Author: Professor Krasso
; Date:   28 April 2021
; Modified by: Karina Alvarez
; Description: Invoice interface
;===========================================
*/

import { LineItem } from './line-item.interface';

//Notifying any file that wants to use this , it needs to import it first
export interface Invoice {
    username: string;
    lineItem: LineItem[];
    partsAmount: number;
    laborAmount: number;
    lineItemTotal: number;
    total: number;
    orderDate: Date;
 }
