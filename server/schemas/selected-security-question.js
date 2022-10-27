/*
============================================
; Title:  selected-security-question.js
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: Selected Security Question Application
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates the values to fill out

let selectedSecurityQuestionSchema = new Schema ({
  questionText: { type: String },
  answerText: { type: String }
})

module.exports = selectedSecurityQuestionSchema;
