/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Douglas Jenkins
; Description: user js input fields
;===========================================
*/

// const fields linked over
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/selected-security-question');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');

// user input fields below

let userSchema = new Schema ({
    userName: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: UserRoleSchema,
    selectedSecurityQuestions: [selectedSecurityQuestions],
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date }

}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
