/*
============================================
; Title:  invoice-api.js
; Author: Professor Krasso
; Date:   28 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description: Invoice API
;===========================================
*/
const express = require('express');
const Invoice = require('../models/invoice');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

/**
 * CreateInvoice API
 */

router.post('/:username', async(req, res)=>{
    
    try{
        //Create new invoice object.
        const userName = req.params.username;
        const newInvoice = {
            username: userName,
            lineItems: req.body.lineItems,
            partsAmount: req.body.partsAmount,
            laborAmount: req.body.laborAmount,
            lineItemTotal: req.body.lineItemTotal,
            total: req.body.total
        }
        console.log(newInvoice);
        //Create new invoice from the selected services and store it in the database.
        Invoice.create(newInvoice, function(err, invoice){
            //Check for any interal server errors.
            if(err){
                console.log(err);
                const createInvoiceMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
            }
             //Otherwise send a base response with the invoice object
            else{
                console.log(invoice);
                const createInvoiceResponse = new BaseResponse('200', 'Query successful', invoice);
                res.json(createInvoiceResponse.toObject());
            }
        });

    }
    //Catch any internal server error.
    catch(e){
        console.log(e);
        const createInvoiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(createInvoiceCatchErrorResponse.toObject());
    }
});