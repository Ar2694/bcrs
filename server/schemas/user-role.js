/*
============================================
; Title:  error-response.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez
; Description: Error response file
;===========================================
*/

//importing mongoose to interact with the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user role schema that creates the structure of the document
let userRoleSchema = new Schema({
  role: {
    type: String,
    default: 'standard'}
});

//map schema to model and export it
module.exports = userRoleSchema;
