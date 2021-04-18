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
const bcrypt = require('bcryptjs');
const RoleSchema = require('../schemas/user-role')


//It defines router variables - configuration
const router = express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

// each API will go through this route -> http://localhost:3000/api/users

/**
 * FindAll API
 * http://localhost:3000/api/users
 */

router.get('/', async (req, res) => {
  try {
    //Retrieve all users data.
    User.find({}).where('isDisabled').equals(true).exec(function(err, users){

      //Check for errors
      if(err){
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      }
      //If no error, send the users object and response*/
      else{
        console.log(users);
        const findAllUsersResponse = new BaseResponse(200, 'Query successful', users);
        res.json(findAllUsersResponse.toObject());
      }
    });
  }

  catch (error) {
    console.log(error);
    const findAllCatchErrorResponse = new ErrorResponse (500, 'Internal Server Error', error);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }

});


/**
 * FindById API
 * http://localhost:3000/api/users/:id
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
 * CreateUser API
 * http://localhost:3000/api/users
 */
router.post('/', async(res, req) => {
    try {
    
      //convert user password into a hash password.
      let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

<<<<<<< HEAD

=======
>>>>>>> 89fc1078da7beef93d80d96184f104f5d02deb73
      standardRole = {
        role: 'standard'
      }

      let newUser = {
<<<<<<< HEAD
        username: req.body.username,
        password: hashPassword,
=======
        userName: req.body.username,
        password: hashedPassword,
>>>>>>> 89fc1078da7beef93d80d96184f104f5d02deb73
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        email: req.body.email,
        role: standardRole
      }

      //Create a new user
      User.create(newUser, function(err, user){

        //Check for any errors
        if(err){
          console.log(err);
          console.log(req.body);
          const createUserMongodbErrorResponse  = new ErrorResponse (500, 'Internal Server Error', err);
          res.status(500).send(createUserMongodbErrorResponse.toObject());
        }
        //Send the user object and response*/
        else{
          console.log(user);
          console.log(req.body);
          const createUserResponse = new BaseResponse(200, 'Query Successful', user);
          res.send(createUserResponse.toObject());
        }
      })
    } catch (error) {
      console.log(error);
      console.log(req.body);
      const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', error);
      res.status(500).send(createUserCatchErrorResponse.toObject());
    }
});

/**
 * UpdateUser API
 * http://localhost:3000/api/users/:id
 */
router.put('/:id', async (req, res) => {
  try {

    User.findOne({'_id': req.body.id }, function(err, user){

      // Checking for errors
      if(err){
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      }

      else{
        console.log(user);

        // the following fields allow you update them
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email
        })

        // saves the updates
        user.save(function(err, savedUser){
          if (err) {
            console.log(err);
            const saveUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const saveUserResponse = new BaseResponse(200, 'Query Successful', user);
            res.json(saveUserResponse.toObject());
          }

        })

      }

    });
  }

  catch (error) {
    console.log(error);
    const updateUserCatchErrorResponse = new ErrorResponse (500, 'Internal Server Error', error);
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }

});


/**
 * FindById API
 * http://localhost:3000/api/users/:id
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
 * DeleteUser API
 * http://localhost:3000/api/users/:id
 */
router.delete('/:id', async(req, res) => {
  try
  {
    //this will help find the employee record
    User.findOne({'_id': req.params.id}, function (err, user) {

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
 * http://localhost:3000/api/users/:username/security-questions
 */

/**
 * FindUserRole API
 * http://localhost:3000/api/users/:username/role
 */

module.exports = router;
