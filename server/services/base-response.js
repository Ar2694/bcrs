/*
============================================
; Title:  base.response.js
; Author: Professor Krasso
; Date:   15 April 2021
; Modified by: Karina Alvarez
; Description: base response application
;===========================================
*/

class BaseResponse {

  /**
   *
   * @param {*} httpCode String http status code
   * @param {*} message Message you want the user to see
   * @param {*} data you can only return an actual data object or null; intended to help the UI handle requests
   */

  constructor (httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  /**
   * Description: toObject function, part of the BaseResponse class
   * @returns new object literal with all the BaseResponse fields (httpCode, message, data, timestamp)
   */

  toObject()
  {
    return {
      "httpCode": this.httpCode,
      "message": this.message,
      "data": this.data,
      "timestamp": new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
