/*
============================================
; Title:  user-api.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: User APIs
;===========================================
*/

//require files to export
const express = require('express');
const User = require('../models/user')
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response')
const bcrypt = require('bcrypt');
const RoleSchema = require('../schemas/user-role')


//It defines router variables - configuration
const router = express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

/**
 * FindAll API
 */

/**
 * FindById API
 */
router.get('/:id', async(req, res) => {
  try
  {
    //this is how we are filtering the data
    User.findOne({'_id': req.params.id}, function(err, user) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, 'MongoDB native error', err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      }
      //If no error message
      else {
        console.log(user);
        const findByIdResponse = new BaseResponse(200, 'Query Successful', user);
        res.json(findByIdResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse (500, 'Internal Server Error', e);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

/**
 * UpdateUser API
 */

/**
 * DeleteUser API
 */
router.delete('/:id', async(req, res) => {
  try
  {
    //this will help find the employee record
    User.findOne({'id': req.params.id}, function (err, user) {

      //if...else function for error handling
      if (err)
      {
        console.log(err);

        const deleteUserMongodbErrorResponse = new ErrorResponse(500, 'MongoDB error', err);
        res.status(500).send(deleteUserMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(user);

        user.set({
          isDisabled: true
        });

        user.save(function(err, savedUser) {
          if (err) {
            console.log (err);

            const savedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
            res.status(500).send(savedUserMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(savedUser);

            const savedUserResponse = new BaseResponse(200, 'Query Successful', savedUser);
            res.json(savedUserResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
  }
})

/**
 * FindSelectedSecurityQuestions API
 */

/**
 * FindUserRole API
 */

module.exports = router;
