/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: application file
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

/**
 * Routes
 */
const SecurityQuestionAPI = require('./routes/security-question-api');
const UserAPI = require('./routes/user-api');
const SessionAPI = require('./routes/session-api');
const RolesAPI  = require('./routes/role-api');
const InvoicesAPI  = require('./routes/invoice-api');


/**
 * App configurations
 */
let app = express();
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

//mongo db connection with username and password to access database
const conn = 'mongodb+srv://bcrsAdmin:bcrsPassword@buwebdev-cluster-1.z53kv.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  userCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * APIs
 */
app.use('/api/security-questions', SecurityQuestionAPI);
app.use('/api/users', UserAPI);
app.use('/api/session', SessionAPI);
app.use('/api/roles', RolesAPI);
app.use('/api/invoice', InvoicesAPI);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
