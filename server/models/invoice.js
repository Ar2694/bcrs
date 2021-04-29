/*
============================================
; Title: invoice.js
; Author: Professor Krasso
; Date: 28 April 2021
; Modified By: Karina Alvarez
; Description: Invoice model
;===========================================
*/

const mongoose = require('mongoose');
const LineItemSchema = require('../schemas/line-item');
const Schema = mongoose.Schema;

/**
 * Invoice collection
 */
const invoiceSchema = new Schema({
  userName: { type: String },
  lineItems: [LineItemSchema], // array of line items - nested
  partsAmount: { type: Number },
  laborAmount: { type: Number },
  lineItemTotal: { type: Number },
  total: { type: Number },
  orderDate: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Invoice', invoiceSchema);
