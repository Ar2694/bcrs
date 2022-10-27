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
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');

// user input fields below

let userSchema = new Schema ({
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: UserRoleSchema,
    selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date }

}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
