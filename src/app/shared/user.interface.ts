/*
============================================
; Title: user.interface.ts
; Author: Professor Krasso
; Date:   16 April 2021
; Modified by: Douglas Jenkins
; Description: User Interface File
;===========================================
*/

// exports the values and have them as a string

export interface User {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  email: string;
}
