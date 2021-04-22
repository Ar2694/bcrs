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

});



/**
 * Verify User
 */
 router.get('/verify/users/:username', async(req, res) => {

});




/**
 * Verify Security Questions
 */
 router.post('/verify/users/:username/security-questions', async(req, res) => {

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
