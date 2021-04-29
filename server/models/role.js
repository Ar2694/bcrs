/*
============================================
; Title: role.js
; Author: Professor Krasso
; Date: 29 April 2021
; Modified By: Arlix Sorto
; Description: Role schema
;===========================================
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roleSchema = new Schema({
    text: {type: String, unique: true},
    isDisabled: {type: Boolean, default: false}
});

module.exports = mongoose.model('Role', roleSchema);