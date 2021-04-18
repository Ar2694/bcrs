/*
============================================
; Title: user.service.ts
; Author: Professor Krasso
; Date:   16 April 2021
; Modified by: Karina Alvarez
; Description: User service app
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/user.interface'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @returns an observably of type any
   */
  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  /**
   *
   * @param userId string for the user
   * @returns an observably of type any
   */
  findUserById(userId: string): Observable<any> {
    return this.http.get(`/api/users/${userId}`);
  }

  /**
   *
   * @param user string for user
   * @returns an observably of any
   */
  createUser(user: User): Observable<any> {
   
    return this.http.post('/api/users', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    })
  }

  /**
   *
   * @param userId string for the user
   * @param user string of user
   * @returns an observable of type any
   */
  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put(`/api/users/${userId}`, {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    })
  }

  /**
   *
   * @param userId string of the user
   * @returns an observable of type any
   */
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`/api/users/${userId}`);
  }

}
