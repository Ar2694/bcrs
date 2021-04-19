/*
============================================
; Title: security-question.js
; Author: Professor Krasso
; Date: 30 January 2021
; Modified By: Arlix Sorto
; Description: Security question schema
;===========================================
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let securityQuestionSchema = new Schema({
    text: {type: String},
    isDisabled: {type: Boolean, default: false}
}, {collection: "securityQuestions"});

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
