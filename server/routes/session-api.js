/*
============================================
; Title:  session-api.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: Session APIs
;===========================================
*/

//require files to export
const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response')


//It defines router variables - configuration
const router = express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

/**
 * User Sign-In
 */
router.post('/signin', async(req, res) => {
  try
  {
    //finding the user by username
    User.findOne({'username': req.body.username}, function(err, user) {
      if (err)
      {
        console.log(err);

        const signinMongodbErrorResponse = new ErrorResponse(500, 'MongoDB Error', err);
        res.status(500).send(signinMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(user);

        // if...else function to determine what would happen if user is valid or invalid
        if (user)
        {
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

          //if...else function to determine what would happened if password is valid or invalid
          if (passwordIsValid)
          {
            console.log('Login Successful!');

            const signinResponse = new BaseResponse(200, 'Login Successful!', user);
            res.json(signinResponse.toObject());
          }
          else
          {
            console.log(`Invalid password for username: ${user.username}`);

            const invalidPasswordResponse = new BaseResponse(401, 'Invalid password. Please try again.', null);
            res.status(401).send(invalidPasswordResponse.toObject());
          }
          //end of if...else function for password validation
        }
        else
        {
          console.log(`username: ${req.body.username} is invalid`)

          const invalidUserNameResponse = new BaseResponse(401, `Invalid username. Please try again.`, null);
          res.status(401).send(invalidUserNameResponse.toObject());
        }
        //end of if...else function for user validation
      }
    })
  }
  catch (e)
  {
    console.log(e);

    const signinCatchErrorResponse = new ErrorResponse (500, 'Internal Server Error', e.message);
    res.status(500).send(signinCatchErrorResponse.toObject());
  }
});


/**
 * Register
 */
router.post('/register', async(req, res) => {
  try
  {
    User.findOne({'username': req.body.username}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      }
      else
      {
        if(!user)
        {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // this will hash the password
          standardRole = {
            role: 'standard'
          }

          // this is going to be the user subject
          let registeredUser = {
            username: req.body.username,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions
          };

          User.create(registeredUser, function(err, newUser)
          {
            if (err)
            {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            }
            else
            {
              console.log(newUser);
              const registeredUserResponse = new BaseResponse('200', 'Query Successful', newUser);
              res.json(registeredUserResponse.toObject());
            }

          })
        }
        else
        {
          console.log('The provided username already exists in our systems');
          const userAlreadyExistsErrorResponse = new ErrorResponse ('500', 'User Already Exists', err);
          res.status(500).send(userAlreadyExistsErrorResponse.toObject());
        }

      }

    })
  } catch (e)
  {
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse ('500', 'Internal Server Error', e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }

});



/**
 * Verify User
 */
 router.get('/verify/users/:username', async(req, res) => {

// loops through the list of users to make sure it is the correct one
  try
  {
    User.findOne({'username': req.params}, function (err, user)
    {
      if (err)
      {
        console.log(err);
        const verifyUserMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(verifyUserMongodbErrorResponse.toObject());
      }
      else{
        console.log(err);
        const verifyUserResponse = new  BaseResponse('200', 'Query Successful', user);
        res.json(verifyUserResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse ('500', 'Internal Server Error', e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

/**
 * Verify Security Questions
 */
 router.post('/verify/users/:username/security-questions', async(req, res) => {
  try{
    //Find the user security question and answers.
    User.findOne({'userName': req.params.username}, function(err,user){
      //Check for error
      if(err){
        const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
      }
      else{
        //Compare the user security answers with the current security answers.
        console.log(user);
        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionText === req.body.questionText1);
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText1);
    
        //Check if each security answers are valid.
        if(selectedSecurityQuestionOne && selectedSecurityQuestionTwo && selectedSecurityQuestionThree){
          console.log(`User ${user.userName} answered their security questions correctly`);
          const validSecurityQuestionsReponse = new BaseResponse('200', 'success', user);
          res.json(validSecurityQuestionsReponse.toObject());
        }else{
          console.log(`User ${user.userName} did not answer their security questions correctly`);
          const invalidSecurityQuestionsResponse = new BaseResponse('200', 'error', user);
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    });
  }
  catch(e){
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});



/**
 * Reset Password
 */

router.post('/users/:username/reset-password', async(req, res) => {

  let password = req.body.password

  try
  {
    /**
     * helps to find the user by username
     */
    User.findOne({'username': req.params.username}, function(err, user) {
      /**
       * Helps with the handling of errors within MongoDB
       */
      if (err)
      {
        console.log(err);

        const resetPasswordMongodbErrorResponse = new ErrorResponse(500, 'MongoDB Error', err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(user);
        /**
         * Hashing the password
         */
        let hashedPassword = bcrypt.hashSync(password, saltRound);

        user.set({ password: hashedPassword });

        /**
         * Saves the password
         */
        user.save(function(err, updatedUser) {
          if (err)
          {
            console.log(err);
            const updatedUserMongodbErrorResponse = new ErrorResponse(500, 'There was a problem when saving your password', err);
            res.status(500).send(updatedUserMongodbErrorResponse.toObject());
          }
          /**
           * Returns the updated user back to the system
           */
          else
          {
            console.log(updatedUser);
            const updatedPasswordResponse = new BaseResponse(200, 'Password Successfully Saved', updatedUser);
            res.json(updatedPasswordResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(resetPasswordCatchError.toObject());
  }
})

module.exports = router;
