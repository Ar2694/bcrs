/*
============================================
; Title:  LineItemSchema.js
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: Selected Security Question Application
;===========================================
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Line item Schema properties
let LineItemSchema = new Schema({
    title: {type: String},
    price: {type: Number}
});

module.exports = LineItemSchema;