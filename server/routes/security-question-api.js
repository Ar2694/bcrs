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
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

// ============================================================================================================================

/**
 * FindById API
*/
router.get('/:id', async(req, res) => {
  try
  {
    // Searches the database for the correct API

    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){

      if (err)
      {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, 'Query Successful', securityQuestion);
        res.json(findByIdResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

// ============================================================================================================================

/**
 *  CreateSecurityQuestion API
 */
router.post('/', async(req, res) => {
  try
  {
    // allows for the question to be created and posted on the body

    let newSecurityQuestion = {
      text: req.body.text
    };

    SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {


      if (err)
      {
        console.log(err);
        const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);
        const createSecurityQuestionResponse = new BaseResponse(200, 'Query Successful', securityQuestion);
        res.json(createSecurityQuestionResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});

// ============================================================================================================================

/**
 * UpdateSecurityQuestion API
*/
router.put('/:id', async(req, res) =>{
  try{
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){

      if (err)
      {
        console.log(err);
        const UpdateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(UpdateSecurityQuestionMongodbErrorResponse.toObject());
      }
      else
      {
        securityQuestion.set({
          text: req.body.text,
          answer: req.body.answer
        });
        securityQuestion.save(function (err, UpdateSecurityQuestion){
          if(err){
            console.log(err);
            const saveSecurityQuestionErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
            res.status(500).send(saveSecurityQuestionErrorResponse.toObject());
          }else{
            console.log(securityQuestion);
            const UpdateSecurityQuestionResponse = new BaseResponse(200, 'Query Successful', UpdateSecurityQuestion);
            res.json(UpdateSecurityQuestionResponse.toObject());
          }
        });

      }
    })

  }catch(e){
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }

  })
/**
 * DeleteSecurityQuestion API
*/
router.delete("/:id", async (req, res) => {
try{

  SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
    if(err){
      console.log(err);
      const deleteSecurityQuestionDbErrorResponse =  new ErrorResponse(500, 'Internal Server Error', err);
      res.status(500).send(deleteSecurityQuestionDbErrorResponse.toObject());
    }else{
      console.log(securityQuestion);

      securityQuestion.set({
        isDisabled: true
      });

       securityQuestion.save(function(err, savedSecurityQuestion){
         if(err){
          console.log(err);
          const savedSecurityQuestionDbErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
          res.status(500).send(savedSecurityQuestionDbErrorResponse.toObject());

         }else{
          console.log(savedSecurityQuestion);
          const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query Successful', savedSecurityQuestion);
           res.json(deleteSecurityQuestionResponse.toObject());
         }
       })
    }

  });
}catch(e){
  console.log(e);
  const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
  res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
}
});
/**
 * FindSecurityQuestionByIds
*/

module.exports = router;
