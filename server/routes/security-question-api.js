/*
============================================
; Title:  security-question-api.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: Security Question APIs
;===========================================
*/

//require files to export
const express = require('express');
const SecurityQuestion = require('../models/security-question')
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response')


//It defines router variables - configuration
const router = express.Router();

// each API will go through this route -> http://localhost:3000/api/security-questions

/**
 * FindAll API
*/
router.get('/', async(req, res) => {
  try
  {
    SecurityQuestion.find({})
    .where('isDisabled')
    .equals(false)
    .exec(function(err, securityQuestion) {

      /**
       * If error occur the if..else function will be able to provide the specific message - error / successful
       */
      if (err)
      {
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);
        const findAllResponse = new BaseResponse(200, 'Query Successful', securityQuestion);
        res.json(findAllResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const FindAllCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(FindAllCatchErrorResponse.toObject());
  }
});

/**
 * FindById API
*/

/**
 * UpdateSecurityQuestion API
*/

/**
 * DeleteSecurityQuestion API
*/

/**
 * FindSecurityQuestionByIds
*/
