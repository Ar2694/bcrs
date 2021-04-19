/*
============================================
; Title:  session-api.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez
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
          res.status(401).setDefaultEncoding(invalidUserNameResponse.toObject());
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

module.exports = router;
